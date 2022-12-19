import React from 'react';

import { useTranslation } from 'next-i18next';
import Countries from '@/src/data/countryStates.json';
import FormService from '@/src/services/form.service';
import { useAppContext } from '@/src/contexts/AppWrapper';

const formPrefix = 'warranty-';
const firstUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const Classes = {
  input: `w-full p-2 py-3 h-[3.5rem] peer transition-all duration-150 font-semibold bg-white border-2 rounded-md !outline-none !ring-2 ring-transparent focus:valid:ring-zaxe focus:invalid:ring-pink-400 text-zinc-600 !border-slate-200`,
  label: `absolute pointer-events-none top-0 px-2 py-0.5 font-semibold duration-150 scale-75 -translate-y-1/2 border rounded-md tranisition-all peer-placeholder-shown:border-transparent border-slate-200 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-focus:border-slate-200 text-slate-500 peer-focus:peer-valid:text-zaxe peer-focus:peer-invalid:text-pink-400 peer-focus:top-0 peer-placeholder-shown:top-7 peer-focus:-translate-x-[10%] max-w-[95%] -translate-x-[10%] peer-placeholder-shown:-translate-x-0 !left-2 placeholder-shown:bg-transparent peer-focus:bg-white bg-white`,
};

function WarrantyForm() {
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
    FormService.sendWarrantyForm(body);
    activateAlertPopup({
      message: t('popups.global.success.form-sent'),
      status: 'success',
    });
  };

  const HandleChange = (e) => {
    try {
      const { value } = e.target;
      const field = e.target.id.replace(formPrefix, '');
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
    const theWarrantyForm = document.querySelector('.warranty-form');

    if (theWarrantyForm)
      theWarrantyForm.addEventListener('submit', HandleSubmit);

    return () => {
      if (theWarrantyForm)
        theWarrantyForm.removeEventListener('submit', HandleSubmit);
    };
  }, [requestBody]);

  const resetForm = () => {
    const inputs = document.querySelectorAll('.warranty-form input');
    const selects = document.querySelectorAll('.warranty-form select');
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
    <form className="grid w-full grid-cols-2 gap-5 p-5 bg-white border shadow-xl font-zaxe rounded-xl warranty-form border-zinc-100">
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          className={Classes.input}
          id="warranty-name"
          placeholder=" "
          pattern="\D{3,}"
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor="warranty-name">
          {t('forms.global.inputs.name')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          className={Classes.input}
          id="warranty-surname"
          placeholder=" "
          pattern="\D{3,}"
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor="warranty-surname">
          {t('forms.global.inputs.surname')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="email"
          className={Classes.input}
          id="warranty-emailAddress"
          placeholder=" "
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
          onChange={HandleChange}
        />
        <Label required htmlFor="warranty-emailAddress">
          {t('forms.global.inputs.email')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <select
          required
          defaultValue=""
          id="warranty-country"
          onChange={HandleChange}
          className={`${Classes.input} min-h-[56px]`}
        >
          <option disabled value="">
            {t('forms.global.inputs.country')} *
          </option>
          {Countries.map(({ name, emoji }) => (
            <option
              key={`warranty-country-${name}`}
              value={name}
            >{`${emoji} ${name}`}</option>
          ))}
        </select>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          type="text"
          placeholder=" "
          pattern="\D{3,}"
          id="warranty-companyName"
          onChange={HandleChange}
          className={Classes.input}
        />
        <Label required htmlFor="warranty-companyName">
          {t('forms.warranty.inputs.company-name')}
        </Label>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          type="text"
          placeholder=" "
          pattern="\D{3,}"
          id="warranty-serialNumber"
          onChange={(e) => {
            const Event = e;
            Event.target.value = Event.target.value.toUpperCase();
            return HandleChange(Event);
          }}
          className={Classes.input}
        />
        <Label required htmlFor="warranty-serialNumber">
          {t('forms.warranty.inputs.serial-number')}
        </Label>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          type="text"
          placeholder=" "
          pattern="\D{3,}"
          id="warranty-distributorName"
          onChange={HandleChange}
          className={Classes.input}
        />
        <Label required htmlFor="warranty-distributorName">
          {t('forms.warranty.inputs.distributor-name')}
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

export default WarrantyForm;