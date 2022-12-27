import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { BiInfoCircle } from 'react-icons/bi';

function ConfirmPopup() {
  const {
    deactivateConfirmPopup,
    confirmPopup: {
      inHTML = false,
      isActive = false,
      message = '',
      onConfirm = () => {},
      onCancel = () => deactivateConfirmPopup(),
    },
  } = useAppContext();

  const { t } = useTranslation();

  return (
    inHTML && (
      <div
        onClick={() => deactivateConfirmPopup()}
        className={`fixed confirm-popup-container font-mark transition-all duration-300 top-0 left-0 !z-[999999999999] flex items-center justify-center w-full h-full p-5 bg-black/50  ${
          isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`grid relative w-full confirm-popup max-w-sm grid-cols-1 gap-10 p-5 transition-all duration-[0.3s] bg-white rounded-xl shadow-2xl shadow-black/40 place-content-between place-items-center ${
            isActive ? 'translate-y-0' : 'translate-y-10'
          }`}
        >
          <button
            className="absolute ring-2 ring-transparent active:ring-sky-400 w-7 h-7 p-0 hover:bg-zinc-300 transition-all duration-150 bg-zinc-200 text-zinc-600 rounded-md m-0 flex justify-center items-center top-2.5 right-2.5"
            type="button"
            onClick={() => deactivateConfirmPopup()}
          >
            <BsPlusLg className="rotate-45" />
          </button>
          <BiInfoCircle className="w-10 h-10 p-2 rounded-full text-sky-500 bg-sky-200" />
          <p className="font-medium text-center text-md text-zinc-700">
            {message}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              className="px-4 py-2 min-w-[100px] transition-all duration-150 rounded-md ring-transparent ring-2 text-zinc-600 hover:text-zinc-800"
              onClick={() => {
                onCancel();
                deactivateConfirmPopup();
              }}
            >
              {t('popups.confirm.buttons.cancel')}
            </button>
            <button
              type="button"
              className="px-4 py-2 min-w-[100px] ring-transparent ring-2 active:ring-sky-400 text-white transition-all disabled:!bg-zinc-400 duration-150 rounded-md bg-zaxe hover:bg-sky-700"
              onClick={() => onConfirm()}
            >
              {t('popups.confirm.buttons.yes')}
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmPopup;
