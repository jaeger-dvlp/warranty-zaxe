import API from '@/src/configs/api.config';

class FormService {
  constructor() {
    this.api = API;
    this.body = {};
  }

  async sendWarrantyForm({ body, supaBase, t }) {
    try {
      this.body = body;
      const { data: isExist, error } = await supaBase
        .from('warrantyList')
        .select('*')
        .eq('deviceSerialNumber', this.body.deviceSerialNumber);

      if (error)
        throw Error(error?.message || 'Error checking device serial number.');

      if (isExist?.length > 0)
        throw Error(t('popups.upload.errors.serial-number-exists'));

      const {
        data: {
          data: { fileURL },
        },
        error: fileErr,
      } = await this.api.post('/warranty/upload', this.body);

      if (fileErr) throw Error(fileErr?.message || 'Error uploading file.');

      const { data: supaData, error: supaErr } = await supaBase
        .from('warrantyList')
        .insert({
          ...this.body,
          invoiceImage: fileURL,
        });

      if (supaErr) throw Error(supaErr?.message || 'Error inserting data.');

      return supaData;
    } catch (error) {
      throw Error(error?.message || 'Error sending warranty form.');
    }
  }
}

export default new FormService();
