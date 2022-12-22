import React from 'react';
import { useTranslation } from 'next-i18next';
import firstUpperCase from '@/src/utils/FirstUpperCase';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { BsLockFill } from 'react-icons/bs';

const Classes = {
  input: `w-full p-2 py-3 h-[3.5rem] peer transition-all duration-150 font-semibold bg-white border-2 rounded-md !outline-none !ring-2 ring-transparent focus:valid:ring-zaxe focus:invalid:ring-pink-400 text-zinc-600 !border-slate-200`,
  label: `absolute pointer-events-none top-0 px-2 py-0.5 font-semibold duration-150 scale-75 -translate-y-1/2 border rounded-md tranisition-all peer-placeholder-shown:border-transparent border-slate-200 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-focus:border-slate-200 text-slate-500 peer-focus:peer-valid:text-zaxe peer-focus:peer-invalid:text-pink-400 peer-focus:top-0 peer-placeholder-shown:top-7 peer-focus:-translate-x-[10%] max-w-[95%] -translate-x-[10%] peer-placeholder-shown:-translate-x-0 !left-2 placeholder-shown:bg-transparent peer-focus:bg-white bg-white`,
};

function LoginForm({ formPrefix, setActiveTab }) {
  const { t } = useTranslation();
  const { activateAlertPopup } = useAppContext();

  const [requestBody, setRequestBody] = React.useState({
    emailAddress: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: requestBody.emailAddress,
      password: requestBody.password,
    };
    console.log(body);
  };

  const HandleChange = (e) => {
    try {
      const { value } = e.target;
      const field = e.target.id.replace(`${formPrefix}-`, '');
      if (requestBody[field] !== undefined) {
        return setRequestBody({
          ...requestBody,
          [field]: firstUpperCase(value),
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
          pattern="\D{3,}"
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
  const { activateAlertPopup } = useAppContext();

  const [requestBody, setRequestBody] = React.useState({
    emailAddress: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: requestBody.emailAddress,
    };
    console.log(body);
  };

  const HandleChange = (e) => {
    try {
      const { value } = e.target;
      const field = e.target.id.replace(`${formPrefix}-`, '');
      if (requestBody[field] !== undefined) {
        return setRequestBody({
          ...requestBody,
          [field]: firstUpperCase(value),
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
          className={`grid relative w-full auth-popup max-w-sm grid-cols-1 gap-10 p-5 transition-all duration-[0.3s] bg-white rounded-xl shadow-2xl shadow-black/40 place-content-between place-items-center ${
            isActive ? 'translate-y-0' : 'translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <span className="relative flex items-center justify-center w-12 h-12 p-2 rounded-full bg-zinc-200">
              <BsLockFill className="w-full h-full text-zinc-700" />
            </span>
          </div>
          {getActiveTab()}
        </div>
      </div>
    )
  );
}

function Label({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor} className={Classes.label}>
      {children}
      {required && <span className="!text-red-300"> *</span>}
    </label>
  );
}

export default AuthPopup;
