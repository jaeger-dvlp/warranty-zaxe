import React from 'react';
import { BiEdit } from 'react-icons/bi';
import Classes from '@/src/utils/Classes';
import { useTranslation } from 'next-i18next';
import Label from '@/src/components/misc/Label';
import Countries from '@/src/data/countryStates.json';
import { useAppContext } from '@/src/contexts/AppWrapper';
import firstUpperCase from '@/src/utils/FirstUpperCase';

function EditPopup({ formPrefix = 'edit-popup-form' }) {
  const {
    editPopup: { inHTML, isActive, item },
    deactivateEditPopup,
    activateAlertPopup,
    activateConfirmPopup,
    deactivateConfirmPopup,
  } = useAppContext();

  const { t } = useTranslation();

  const [oldItem, setOldItem] = React.useState({});
  const [updatedItem, setUpdatedItem] = React.useState({});

  React.useEffect(() => {
    if (item && item.id) {
      setOldItem(item);
      setUpdatedItem(item);
    }

    return () => {
      setOldItem({});
      setUpdatedItem({});
    };
  }, [item?.id]);

  const askToUpdate = () => {};

  const handleDeactivate = () => {
    if (oldItem !== updatedItem) {
      // return ask to confirm
      return activateConfirmPopup({
        message: t('popups.global.confirmation.update'),
        onConfirm: () => {
          deactivateEditPopup();
          return deactivateConfirmPopup();
        },
        onCancel: () => deactivateConfirmPopup(),
      });
    }

    return deactivateEditPopup();
  };

  const HandleChange = (e) => {
    try {
      const { value } = e.target;
      const field = e.target.id.replace(`${formPrefix}-`, '');
      if (updatedItem[field] !== undefined) {
        return setUpdatedItem({
          ...updatedItem,
          [field]: value,
        });
      }
      return activateAlertPopup({
        smessage: t('popups.global.errors.invalid-field'),
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
    inHTML && (
      <div
        onClick={handleDeactivate}
        className={`fixed edit-popup-container font-mark transition-all duration-300 top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full p-5 bg-black/50  ${
          isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`grid relative w-full max-h-[85vh] overflow-auto edit-popup max-w-xl grid-cols-1 gap-10 p-5 transition-all duration-[0.3s] bg-white rounded-xl shadow-2xl shadow-black/40 place-content-between place-items-center ${
            isActive ? 'translate-y-0' : 'translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <span className="relative flex items-center justify-center w-12 h-12 p-2 rounded-lg bg-zinc-200">
              <BiEdit className="w-full h-full text-zinc-700" />
            </span>
          </div>
          <form
            onSubmit={askToUpdate}
            className="grid w-full grid-cols-1 gap-5 xl:grid-cols-2 lg:grid-cols-2 edit-form fade-in place-content-start place-items-start"
          >
            <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
              <input
                type="text"
                className={Classes.input}
                id={`${formPrefix}-deviceSerialNumber`}
                placeholder=" "
                pattern="^ZX[a-zA-Z0-9]{7,}$"
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
                defaultValue={updatedItem.deviceSerialNumber}
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.purchaseDate.invalid')
                  )
                }
                onChange={HandleChange}
                defaultValue={updatedItem.purchaseDate}
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.name.invalid')
                  )
                }
                onChange={(e) => {
                  const Event = e;
                  if (Event.target.validity.valid) {
                    Event.target.value = firstUpperCase(Event.target.value);
                    HandleChange(Event);
                  }
                }}
                defaultValue={updatedItem.name}
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.surname.invalid')
                  )
                }
                onChange={(e) => {
                  const Event = e;
                  Event.target.value = firstUpperCase(Event.target.value);
                  HandleChange(Event);
                }}
                defaultValue={updatedItem.surname}
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.emailAddress.invalid')
                  )
                }
                onChange={HandleChange}
                defaultValue={updatedItem.emailAddress}
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.phoneNumber.invalid')
                  )
                }
                onChange={HandleChange}
                defaultValue={updatedItem.phoneNumber}
              />
              <Label required htmlFor={`${formPrefix}-phoneNumber`}>
                {t('forms.global.inputs.phoneNumber.label')}
              </Label>
            </section>
            <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
              <select
                required
                id={`${formPrefix}-country`}
                onChange={HandleChange}
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.country.invalid')
                  )
                }
                className={`${Classes.input} min-h-[56px]`}
                defaultValue={updatedItem.country}
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
            <section className="relative w-full xl:col-span-1 lg:col-span-1 col-span-full">
              <input
                required
                type="url"
                placeholder=" "
                minLength={2}
                id={`${formPrefix}-invoiceImage`}
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.invoiceImageURL.invalid')
                  )
                }
                onChange={HandleChange}
                className={Classes.input}
                defaultValue={updatedItem.invoiceImage}
              />
              <Label required htmlFor={`${formPrefix}-invoiceImage`}>
                {t('forms.global.inputs.invoiceImageURL.label')}
              </Label>
            </section>
            <section className="relative w-full col-span-full">
              <input
                required
                type="text"
                placeholder=" "
                minLength={2}
                id={`${formPrefix}-companyName`}
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.companyName.invalid')
                  )
                }
                onChange={HandleChange}
                className={Classes.input}
                defaultValue={updatedItem.companyName}
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
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    t('forms.global.inputs.distributorName.invalid')
                  )
                }
                onChange={HandleChange}
                className={Classes.input}
                defaultValue={updatedItem.distributorName}
              />
              <Label required htmlFor={`${formPrefix}-distributorName`}>
                {t('forms.global.inputs.distributorName.label')}
              </Label>
            </section>
            <section className="relative flex items-center justify-end w-full gap-3 col-span-full">
              <button
                type="button"
                className="p-2 transition-all duration-150 rounded-md ring-transparent ring-2 text-zinc-600 hover:text-zinc-800"
                onClick={handleDeactivate}
              >
                {t('popups.confirm.buttons.cancel')}
              </button>
              <button
                type="submit"
                className="p-2 px-5 text-white transition-all duration-200 border-b-4 active:mb-[4px] mb-0 rounded-md active:border-b-0 active:translate-y-[4px] bg-zaxe hover:bg-sky-600 border-b-sky-700"
              >
                {t('forms.global.buttons.submit')}
              </button>
            </section>
          </form>
        </div>
      </div>
    )
  );
}

export default EditPopup;
