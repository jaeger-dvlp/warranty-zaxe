import API from '@/src/configs/api.config';

class FormService {
  constructor() {
    this.api = API;
    this.body = {};
  }

  async sendWarrantyForm(body) {
    // this.api.post('/forms/warranty', body); etc.
    this.body = body;
    console.log(this.body);
  }
}

export default new FormService();
