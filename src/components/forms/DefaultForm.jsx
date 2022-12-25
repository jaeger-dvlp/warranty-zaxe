import React from 'react';
import Classes from '@/src/utils/Classes';
import { BiImageAdd } from 'react-icons/bi';
import { useTranslation } from 'next-i18next';
import Countries from '@/src/data/countryStates.json';
import firstUpperCase from '@/src/utils/FirstUpperCase';
import { useAppContext } from '@/src/contexts/AppWrapper';

function DefaultForm({
  onSubmit = () => null,
  formName = 'a-default-form',
  formPrefix = 'default',
}) {
  const { t } = useTranslation();
  const { activateAlertPopup } = useAppContext();
  const [requestBody, setRequestBody] = React.useState({
    deviceSerialNumber: '',
    purchaseDate: '',
    name: '',
    surname: '',
    emailAddress: '',
    phoneNumber: '',
    country: '',
    invoiceImage: '',
    companyName: '',
    distributorName: '',
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    const body = {
      fullName: `${requestBody.name} ${requestBody.surname}`,
      emailAddress: requestBody.emailAddress,
      country: requestBody.country,
      companyName: requestBody.companyName,
      serialNumber: requestBody.serialNumber,
      distributorName: requestBody.distributorName,
    };

    onSubmit(body);
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

  React.useEffect(() => {
    const theForm = document.querySelector(`form.${formName}`);

    if (theForm) theForm.addEventListener('submit', HandleSubmit);

    return () => {
      if (theForm) theForm.removeEventListener('submit', HandleSubmit);
    };
  }, [requestBody]);

  const resetForm = () => {
    const inputs = document.querySelectorAll(`form.${formName} input`);
    const selects = document.querySelectorAll(`form.${formName} select`);
    inputs.forEach((input, i) => {
      inputs[i].value = '';
    });
    selects.forEach((select, i) => {
      selects[i].value = '';
    });
    setRequestBody({
      name: '',
      surname: '',
      emailAddress: '',
      country: '',
      companyName: '',
      serialNumber: '',
      distributorName: '',
    });
  };

  return (
    <form
      autoComplete="on"
      className={`grid ${formName} w-full grid-cols-2 gap-5`}
    >
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          autoComplete="on"
          className={Classes.input}
          id={`${formPrefix}-deviceSerialNumber`}
          placeholder=" "
          pattern="{3,}"
          minLength={3}
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-deviceSerialNumber`}>
          {t('forms.global.inputs.deviceSerialNumber')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          autoComplete="on"
          className={Classes.input}
          id={`${formPrefix}-purchaseDate`}
          placeholder=" "
          pattern="\D{3,}"
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-purchaseDate`}>
          {t('forms.global.inputs.purchaseDate')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          autoComplete="on"
          className={Classes.input}
          id={`${formPrefix}-name`}
          placeholder=" "
          pattern="\D{3,}"
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-name`}>
          {t('forms.global.inputs.name')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          autoComplete="on"
          className={Classes.input}
          id={`${formPrefix}-surname`}
          placeholder=" "
          pattern="\D{3,}"
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-surname`}>
          {t('forms.global.inputs.surname')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
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
          {t('forms.global.inputs.emailAddress')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          autoComplete="on"
          className={Classes.input}
          id={`${formPrefix}-phoneNumber`}
          placeholder=" "
          pattern="[0-9]{10,15}"
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-phoneNumber`}>
          {t('forms.global.inputs.phoneNumber')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <select
          required
          defaultValue=""
          id={`${formPrefix}-country`}
          onChange={HandleChange}
          className={`${Classes.input} min-h-[56px]`}
        >
          <option disabled value="">
            {t('forms.global.inputs.country')} *
          </option>
          {Countries.map(({ name, emoji }) => (
            <option
              key={`${formPrefix}-country-${name}`}
              value={name}
            >{`${emoji} ${name}`}</option>
          ))}
        </select>
      </section>
      <section className="relative h-[3.5rem] w-full xl:col-span-1 lg:col-span-1 border-none rounded-md font-semibold text-slate-500  col-span-full flex justify-center items-center flex-nowrap">
        <span className="w-full border-slate-200 border-r-0 rounded-l-md border-2 p-2 flex justify-start gap-1 items-center text-left h-full overflow-hidden">
          <span>{t('forms.global.inputs.invoiceImage')}</span>
          <span className="!text-red-300"> *</span>
        </span>
        <button
          className="w-full p-2 rounded-r-md h-full flex hover:bg-zaxe transition-all duration-150 justify-center items-center max-w-[75px] overflow-hidden !outline-none !ring-0 bg-zinc-400 text-zinc-600 hover:text-white"
          type="button"
        >
          <BiImageAdd className="w-[30px] h-[30px] pl-[3px]" />
        </button>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          autoComplete="on"
          type="text"
          placeholder=" "
          pattern="\D{3,}"
          id={`${formPrefix}-companyName`}
          onChange={HandleChange}
          className={Classes.input}
        />
        <Label required htmlFor={`${formPrefix}-companyName`}>
          {t('forms.global.inputs.companyName')}
        </Label>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          autoComplete="on"
          type="text"
          placeholder=" "
          pattern="\D{3,}"
          id={`${formPrefix}-distributorName`}
          onChange={HandleChange}
          className={Classes.input}
        />
        <Label required htmlFor={`${formPrefix}-distributorName`}>
          {t('forms.global.inputs.distributorName')}
        </Label>
      </section>
      <section className="relative flex items-center justify-end w-full gap-3 col-span-full">
        <button
          type="button"
          onClick={() => resetForm()}
          className="p-2 px-5 text-white transition-all duration-200 border-b-4 active:mb-[4px] mb-0 rounded-md active:border-b-0 active:translate-y-[4px] bg-zinc-500 hover:bg-zinc-600 border-b-zinc-700"
        >
          {t('forms.global.buttons.reset')}
        </button>
        <button
          type="submit"
          className="p-2 px-5 text-white transition-all duration-200 border-b-4 active:mb-[4px] mb-0 rounded-md active:border-b-0 active:translate-y-[4px] bg-zaxe hover:bg-sky-600 border-b-sky-700"
        >
          {t('forms.global.buttons.submit')}
        </button>
      </section>
    </form>
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

export default DefaultForm;
