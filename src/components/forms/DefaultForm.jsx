import React from 'react';
import Classes from '@/src/utils/Classes';
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
    name: '',
    surname: '',
    emailAddress: '',
    country: '',
    companyName: '',
    serialNumber: '',
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
          {t('forms.global.inputs.email')}
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
          {t('forms.global.inputs.company-name')}
        </Label>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          autoComplete="on"
          type="text"
          placeholder=" "
          pattern="\D{3,}"
          id={`${formPrefix}-serialNumber`}
          onChange={(e) => {
            const Event = e;
            Event.target.value = Event.target.value.toUpperCase();
            return HandleChange(Event);
          }}
          className={Classes.input}
        />
        <Label required htmlFor={`${formPrefix}-serialNumber`}>
          {t('forms.global.inputs.serial-number')}
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
          {t('forms.global.inputs.distributor-name')}
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
