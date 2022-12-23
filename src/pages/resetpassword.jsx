import React from 'react';
import Link from 'next/link';
import Classes from '@/src/utils/Classes';
import { useTranslation } from 'next-i18next';
import Label from '@/src/components/misc/Label';
import AuthService from '@/src/services/auth.service';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function ResetPassword({
  formName = 'reset-password-form',
  formPrefix = 'reset-password',
}) {
  const session = useSession();
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { activateAlertPopup, updateAlertPopup } = useAppContext();

  const [requestBody, setRequestBody] = React.useState({
    password: '',
    passwordConfirmation: '',
  });

  const resetPassword = async (e) => {
    try {
      e.preventDefault();
      activateAlertPopup({
        status: 'loading',
        message: t('popups.reset-pwd.loading.resetting-password'),
      });

      const {
        user: { email },
      } = session;

      const { password, passwordConfirmation } = requestBody;
      if (password !== passwordConfirmation) {
        return updateAlertPopup({
          status: 'error',
          message: t('popups.reset-pwd.errors.passwords-not-match'),
        });
      }

      return await AuthService.ResetPWD({
        email,
        password,
        supabase,
      })
        .then(() => {
          updateAlertPopup({
            status: 'success',
            message: t('popups.reset-pwd.success.password-reset'),
          });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      return updateAlertPopup({
        status: 'error',
        message: error?.message || t('popups.global.errors.error-occurred'),
      });
    }
  };

  const HandleChange = (e) => {
    try {
      const { value } = e.target;
      const field = e.target.id.replace(`${formPrefix}-`, '');
      if (requestBody[field] !== undefined) {
        return setRequestBody({
          ...requestBody,
          [field]: value,
        });
      }
      return activateAlertPopup({
        message: t('popups.global.errors.invalid-field'),
        status: 'error',
      });
    } catch (error) {
      return activateAlertPopup({
        message: error.message,
        status: 'error',
      });
    }
  };

  if (!session) {
    return (
      <section className="grid w-full grid-cols-1 font-zaxe place-content-start place-items-center">
        <Welcome />
        <section className="grid items-start justify-start w-full grid-cols-1 gap-2 px-5 place-content-start place-items-start max-w-app">
          <p className="text-sm text-left text-zinc-500">
            {t('forms.reset-pwd.buttons.not-logged-in')}
          </p>
          <Link
            className="p-2 px-5 text-sm text-white transition-all duration-200 border-b-4 active:mb-[4px] mb-0 rounded-md active:border-b-0 active:translate-y-[4px] bg-zaxe hover:bg-sky-600 border-b-sky-700"
            href="/"
          >
            {t('forms.reset-pwd.buttons.go-back')}
          </Link>
        </section>
      </section>
    );
  }

  return (
    session && (
      <section className="grid w-full grid-cols-1 font-zaxe place-content-start place-items-center">
        <Welcome />
        <section className="flex items-start justify-start w-full max-w-app">
          <div className="flex items-center justify-center w-full p-5 bg-white border shadow-xl rounded-xl border-zinc-100">
            <form
              autoComplete="on"
              onSubmit={(e) => resetPassword(e)}
              className={`grid ${formName} w-full grid-cols-2 gap-5`}
            >
              <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
                <input
                  type="password"
                  autoComplete="on"
                  className={Classes.input}
                  id={`${formPrefix}-password`}
                  placeholder=" "
                  required
                  onChange={(e) => HandleChange(e)}
                />
                <Label required htmlFor={`${formPrefix}-password`}>
                  {t('forms.reset-pwd.inputs.pwd')}
                </Label>
              </section>
              <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
                <input
                  type="password"
                  autoComplete="on"
                  className={Classes.input}
                  id={`${formPrefix}-passwordConfirmation`}
                  placeholder=" "
                  required
                  onChange={(e) => HandleChange(e)}
                />
                <Label required htmlFor={`${formPrefix}-passwordConfirmation`}>
                  {t('forms.reset-pwd.inputs.pwd-confirm')}
                </Label>
              </section>
              <section className="relative flex items-center justify-end w-full col-span-full">
                <button
                  type="submit"
                  className="p-2 px-5 text-white transition-all duration-200 border-b-4 active:mb-[4px] mb-0 rounded-md active:border-b-0 active:translate-y-[4px] bg-zaxe hover:bg-sky-600 border-b-sky-700"
                >
                  {t('forms.reset-pwd.buttons.update')}
                </button>
              </section>
            </form>
          </div>
        </section>
      </section>
    )
  );
}

function Welcome() {
  const { t } = useTranslation();
  return (
    <section className="flex items-start justify-start w-full py-5 my-5 max-w-app">
      <section className="grid w-full max-w-md grid-cols-1 gap-2 p-5 xl:max-w-2xl lg:max-w-2xl place-content-start place-items-start ">
        <h1 className="text-xl font-semibold xl:text-3xl lg:text-3xl text-zinc-500">
          {t('pages.resetpwd.welcome.heading')}
        </h1>
        <p className="text-xs xl:text-sm lg:text-sm text-zinc-500">
          {t('pages.resetpwd.welcome.description')}
        </p>
      </section>
    </section>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ResetPassword;
