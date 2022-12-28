import React from 'react';
import { useTranslation } from 'next-i18next';
import formService from '@/src/services/form.service';
import { useAppContext } from '@/src/contexts/AppWrapper';
import DefaultForm from '@/src/components/forms/DefaultForm';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function Add() {
  const { t } = useTranslation();
  const supaBase = useSupabaseClient();
  const { activateAlertPopup, updateAlertPopup } = useAppContext();

  const onSubmit = async (body) => {
    try {
      activateAlertPopup({
        status: 'loading',
        message: t('popups.upload.loading.sending-invoice-warranty-record'),
      });

      return setTimeout(
        () =>
          formService
            .sendWarrantyForm({ body, supaBase, t })
            .then(() =>
              updateAlertPopup({
                status: 'success',
                message: t(
                  'popups.upload.success.sent-invoice-warranty-record'
                ),
              })
            )
            .catch((err) =>
              updateAlertPopup({
                status: 'error',
                message:
                  err?.message || t('popups.global.errors.error-occurred'),
              })
            ),
        2000
      );
    } catch (error) {
      return updateAlertPopup({
        status: 'error',
        message: error?.message || t('popups.global.errors.error-occurred'),
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-5 bg-white border shadow-xl fade-in rounded-xl font-zaxe border-zinc-100">
      <DefaultForm
        formName="warranty-add-form"
        formPrefix="warranty"
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Add;
