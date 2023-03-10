import React from 'react';
import Classes from '@/src/utils/Classes';
import { BsLockFill } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import Label from '@/src/components/misc/Label';
import AuthService from '@/src/services/auth.service';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function LoginForm({ formPrefix = 'auth-login-form', setActiveTab }) {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { activateAlertPopup, updateAlertPopup, deactivateAuthPopup } =
    useAppContext();

  const [requestBody, setRequestBody] = React.useState({
    emailAddress: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      activateAlertPopup({
        status: 'loading',
        message: t('popups.auth.loading.logging-in'),
      });

      const body = {
        supabase,
        email: requestBody.emailAddress,
        password: requestBody.password,
      };

      return await AuthService.Login(body)
        .then(async () => {
          deactivateAuthPopup();
          return updateAlertPopup({
            status: 'success',
            message: t('popups.auth.success.logged-in'),
          });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      if (error.message === 'Invalid login credentials') {
        return updateAlertPopup({
          status: 'error',
          message: t('popups.auth.errors.invalid-credentials'),
        });
      }

      return updateAlertPopup({
        status: 'error',
        message: error.message || t('popups.global.errors.error-occurred'),
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

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 gap-5 auth-login-form fade-in place-content-start place-items-start"
    >
      <section className="relative w-full">
        <input
          type="email"
          autoComplete="on"
          className={Classes.input}
          id={`${formPrefix}-emailAddress`}
          placeholder=" "
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
          onChange={HandleChange}
        />
        <Label required htmlFor={`${formPrefix}-emailAddress`}>
          {t('forms.auth.inputs.email')}
        </Label>
      </section>
      <section className="relative w-full">
        <input
          type="password"
          autoComplete="off"
          className={Classes.input}
          id={`${formPrefix}-password`}
          placeholder=" "
          required
          onChange={HandleChange}
        />
        <Label required htmlFor={`${formPrefix}-emailAddress`}>
          {t('forms.auth.inputs.password')}
        </Label>
      </section>
      <section className="relative flex items-center justify-end w-full gap-5">
        <button
          type="button"
          onClick={() => {
            setActiveTab(1);
          }}
          className="text-sm text-zinc-500"
        >
          {t('forms.auth.buttons.forgot-password')}
        </button>
        <button
          type="submit"
          className="p-2 px-5 text-white transition-all duration-200 border-b-4 active:mb-[4px] mb-0 rounded-md active:border-b-0 active:translate-y-[4px] bg-zaxe hover:bg-sky-600 border-b-sky-700"
        >
          {t('forms.auth.buttons.login')}
        </button>
      </section>
    </form>
  );
}

function ForgotPasswordForm({
  formPrefix = 'auth-forgot-password',
  setActiveTab,
}) {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { activateAlertPopup, updateAlertPopup } = useAppContext();

  const [requestBody, setRequestBody] = React.useState({
    emailAddress: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        email: requestBody.emailAddress,
      };

      activateAlertPopup({
        status: 'loading',
        message: t('popups.auth.loading.resetting-password'),
      });
      await supabase.auth
        .resetPasswordForEmail(body.email, {
          redirectTo: `${
            window?.location?.origin || 'https://warranty-zaxe.vercel.app'
          }/resetpassword`,
        })
        .then(({ error }) => {
          if (error) throw error;

          return updateAlertPopup({
            status: 'success',
            message: t('popups.auth.success.reset-password'),
          });
        });
    } catch (error) {
      updateAlertPopup({
        status: 'error',
        message: error.message || t('popups.global.errors.error-occurred'),
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
  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 gap-5 auth-forgot-password fade-in place-content-start place-items-start"
    >
      <section className="relative w-full">
        <input
          type="email"
          autoComplete="on"
          className={Classes.input}
          id={`${formPrefix}-emailAddress`}
          placeholder=" "
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
          onChange={HandleChange}
        />
        <Label required htmlFor={`${formPrefix}-emailAddress`}>
          {t('forms.auth.inputs.email')}
        </Label>
      </section>
      <section className="relative flex items-center justify-end w-full gap-5">
        <button
          type="button"
          onClick={() => {
            setActiveTab(0);
          }}
          className="text-sm text-zinc-500"
        >
          {t('forms.auth.buttons.go-back')}
        </button>
        <button
          type="submit"
          className="p-2 px-5 text-white transition-all duration-200 border-b-4 active:mb-[4px] mb-0 rounded-md active:border-b-0 active:translate-y-[4px] bg-zaxe hover:bg-sky-600 border-b-sky-700"
        >
          {t('forms.auth.buttons.reset-password')}
        </button>
      </section>
    </form>
  );
}

function AuthPopup() {
  const formPrefix = 'auth';
  const {
    authPopup: { inHTML, isActive },
    deactivateAuthPopup,
  } = useAppContext();

  const [activeTab, setActiveTab] = React.useState(0);
  const Tabs = [LoginForm, ForgotPasswordForm];

  const getActiveTab = () => {
    const ActiveTab = Tabs[activeTab];
    return <ActiveTab formPrefix={formPrefix} setActiveTab={setActiveTab} />;
  };

  return (
    inHTML && (
      <div
        onClick={() => deactivateAuthPopup()}
        className={`fixed auth-popup-container font-mark transition-all duration-300 top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full p-5 bg-black/50  ${
          isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`grid relative w-full auth-popup max-w-md grid-cols-1 gap-10 p-5 transition-all duration-[0.3s] bg-white rounded-xl shadow-2xl shadow-black/40 place-content-between place-items-center ${
            isActive ? 'translate-y-0' : 'translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <span className="relative flex items-center justify-center w-12 h-12 p-2 rounded-lg bg-zinc-200">
              <BsLockFill className="w-full h-full text-zinc-700" />
            </span>
          </div>
          {getActiveTab()}
        </div>
      </div>
    )
  );
}

export default AuthPopup;
