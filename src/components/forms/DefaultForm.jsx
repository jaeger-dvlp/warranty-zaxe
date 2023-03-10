import React from 'react';
import Classes from '@/src/utils/Classes';
import { BiImageAdd } from 'react-icons/bi';
import { useTranslation } from 'next-i18next';
import Countries from '@/src/data/countryStates.json';
import firstUpperCase from '@/src/utils/FirstUpperCase';
import { useAppContext } from '@/src/contexts/AppWrapper';

const getDateSeperator = (date) => {
  if (date.includes('/')) {
    return '/';
  }
  if (date.includes('-')) {
    return '-';
  }
  if (date.includes('.')) {
    return '.';
  }
  return '';
};

const getInvoiceImageName = ({
  name,
  surname,
  deviceSerialNumber,
  invoiceImage: { type },
}) => {
  const str = `${deviceSerialNumber}_${name
    .replace(' ', '_')
    .toLowerCase()}_${surname.replace(' ', '_').toLowerCase()}.${
    type.split('/')[1]
  }`;

  return str;
};

function DefaultForm({
  onSubmit = async () => null,
  formName = 'a-default-form',
  formPrefix = 'default',
}) {
  const { t } = useTranslation();
  const [invoiceImage, setInvoiceImage] = React.useState(null);
  const { activateAlertPopup, activateChoosePopup } = useAppContext();

  const [requestBody, setRequestBody] = React.useState({
    deviceSerialNumber: '',
    purchaseDate: '',
    name: '',
    surname: '',
    emailAddress: '',
    phoneNumber: '',
    country: '',
    invoiceImage: null,
    companyName: '',
    distributorName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isBodyValid = Object.keys(requestBody).map((key) => {
      if (!requestBody[key] || requestBody[key] === '') {
        activateAlertPopup({
          message: t('popups.global.errors.empty-field'),
          status: 'error',
        });
        return false;
      }
      return true;
    });

    if (!isBodyValid.includes(false)) {
      try {
        const body = {
          name: requestBody.name,
          surname: requestBody.surname,
          purchaseDate: requestBody.purchaseDate,
          deviceSerialNumber: requestBody.deviceSerialNumber,
          emailAddress: requestBody.emailAddress,
          phoneNumber: requestBody.phoneNumber,
          country: requestBody.country,
          invoiceImage: {
            name: getInvoiceImageName(requestBody),
            type: invoiceImage?.type,
            value: invoiceImage?.value,
          },
          companyName: requestBody.companyName,
          distributorName: requestBody.distributorName,
        };

        const dateSeperator = getDateSeperator(body.purchaseDate);
        const PurchaseDate = body.purchaseDate.split(dateSeperator);
        if (PurchaseDate[2] > new Date().getFullYear()) {
          return activateAlertPopup({
            message: t('popups.global.errors.invalid-date'),
            status: 'error',
          });
        }

        return await onSubmit(body);
      } catch (error) {
        return null;
      }
    }
    return null;
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

    if (theForm) theForm.addEventListener('submit', handleSubmit);

    return () => {
      if (theForm) theForm.removeEventListener('submit', handleSubmit);
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
      deviceSerialNumber: '',
      purchaseDate: '',
      name: '',
      surname: '',
      emailAddress: '',
      phoneNumber: '',
      country: '',
      invoiceImage: null,
      companyName: '',
      distributorName: '',
    });
    setInvoiceImage(null);
  };

  React.useEffect(() => {
    if (invoiceImage && requestBody.invoiceImage !== invoiceImage) {
      setRequestBody({
        ...requestBody,
        invoiceImage,
      });
    }
  }, [invoiceImage, requestBody]);

  return (
    <form className={`grid ${formName} w-full grid-cols-2 gap-5`}>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          className={Classes.input}
          id={`${formPrefix}-deviceSerialNumber`}
          placeholder=" "
          pattern="^ZX[0-9a-zA-Z]{5,}$"
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              t('forms.global.inputs.deviceSerialNumber.invalid')
            )
          }
          required
          onChange={(e) => {
            const Event = e;
            Event.target.value = Event.target.value.toUpperCase();
            if (Event.target.validity.valid) {
              HandleChange(Event);
            }
          }}
        />
        <Label required htmlFor={`${formPrefix}-deviceSerialNumber`}>
          {t('forms.global.inputs.deviceSerialNumber.label')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          className={Classes.input}
          id={`${formPrefix}-purchaseDate`}
          placeholder=" "
          // eslint-disable-next-line no-octal-escape
          pattern="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
          required
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              t('forms.global.inputs.purchaseDate.invalid')
            )
          }
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-purchaseDate`}>
          {t('forms.global.inputs.purchaseDate.label')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          className={Classes.input}
          id={`${formPrefix}-name`}
          placeholder=" "
          minLength={2}
          required
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(t('forms.global.inputs.name.invalid'))
          }
          onChange={(e) => {
            const Event = e;
            if (Event.target.validity.valid) {
              Event.target.value = firstUpperCase(Event.target.value);
              HandleChange(Event);
            }
          }}
        />
        <Label required htmlFor={`${formPrefix}-name`}>
          {t('forms.global.inputs.name.label')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          className={Classes.input}
          id={`${formPrefix}-surname`}
          placeholder=" "
          minLength={2}
          required
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(t('forms.global.inputs.surname.invalid'))
          }
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-surname`}>
          {t('forms.global.inputs.surname.label')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="email"
          className={Classes.input}
          id={`${formPrefix}-emailAddress`}
          placeholder=" "
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              t('forms.global.inputs.emailAddress.invalid')
            )
          }
          onChange={HandleChange}
        />
        <Label required htmlFor={`${formPrefix}-emailAddress`}>
          {t('forms.global.inputs.emailAddress.label')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <input
          type="text"
          className={Classes.input}
          id={`${formPrefix}-phoneNumber`}
          placeholder=" "
          pattern=".[0-9 ]{10,20}"
          required
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              t('forms.global.inputs.phoneNumber.invalid')
            )
          }
          onChange={(e) => {
            const Event = e;
            Event.target.value = firstUpperCase(Event.target.value);
            HandleChange(Event);
          }}
        />
        <Label required htmlFor={`${formPrefix}-phoneNumber`}>
          {t('forms.global.inputs.phoneNumber.label')}
        </Label>
      </section>
      <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
        <select
          required
          defaultValue=""
          id={`${formPrefix}-country`}
          onChange={HandleChange}
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(t('forms.global.inputs.country.invalid'))
          }
          className={`${Classes.input} min-h-[56px]`}
        >
          <option disabled value="">
            {t('forms.global.inputs.country.label')} *
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
        <span className="flex items-center justify-start w-full h-full gap-1 p-2 px-4 overflow-hidden text-left border-2 border-r-0 border-slate-200 rounded-l-md">
          <span>{t('forms.global.inputs.invoiceImage.label')}</span>
          <span className="!text-red-300"> *</span>
        </span>
        <button
          onClick={() => {
            if (requestBody.invoiceImage) {
              return activateChoosePopup({
                stateChanger: {
                  state: invoiceImage,
                  activateState: setInvoiceImage,
                },
              });
            }
            return activateChoosePopup({
              stateChanger: {
                state: invoiceImage,
                activateState: setInvoiceImage,
              },
            });
          }}
          className={` ${
            requestBody.invoiceImage
              ? 'bg-green-600 text-white hover:bg-green-800'
              : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
          }
          w-full p-2 rounded-r-md h-full flex transition-all duration-150 justify-center items-center max-w-[75px] overflow-hidden !outline-none !ring-0`}
          type="button"
        >
          <BiImageAdd className="w-[30px] h-[30px] pl-[3px]" />
        </button>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          type="text"
          placeholder=" "
          minLength={2}
          id={`${formPrefix}-companyName`}
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              t('forms.global.inputs.companyName.invalid')
            )
          }
          onChange={HandleChange}
          className={Classes.input}
        />
        <Label required htmlFor={`${formPrefix}-companyName`}>
          {t('forms.global.inputs.companyName.label')}
        </Label>
      </section>
      <section className="relative w-full col-span-full">
        <input
          required
          type="text"
          placeholder=" "
          minLength={2}
          id={`${formPrefix}-distributorName`}
          onInput={(e) => e.target.setCustomValidity('')}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              t('forms.global.inputs.distributorName.invalid')
            )
          }
          onChange={HandleChange}
          className={Classes.input}
        />
        <Label required htmlFor={`${formPrefix}-distributorName`}>
          {t('forms.global.inputs.distributorName.label')}
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
