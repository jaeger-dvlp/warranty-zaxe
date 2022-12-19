import React from 'react';
import Icon from '@/src/icons';
import { BsPlusLg } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import { useAppContext } from '@/src/contexts/AppWrapper';

const Icons = {
  success: (
    <Icon
      name="check"
      className="w-10 h-10 p-2 text-green-500 bg-green-200 rounded-full"
    />
  ),
  error: (
    <Icon
      name="error"
      className="w-10 h-10 p-2 text-red-500 bg-red-200 rounded-full"
    />
  ),
  loading: (
    <Icon
      name="loading"
      className="w-10 h-10 p-2 rounded-full text-sky-500 bg-sky-200 animate-spin"
    />
  ),
};

function AlertPopup() {
  const {
    alertPopup: { inHTML, isActive, status, message },
    deactivateAlertPopup,
  } = useAppContext();

  const { t } = useTranslation();
  const TheIcon = () => Icons[status] || Icons.loading;

  return (
    inHTML && (
      <div
        onClick={() => {
          if (status !== 'loading') return deactivateAlertPopup();
          return false;
        }}
        className={`fixed notify-popup-container font-mark transition-all duration-300 top-0 left-0 z-[99999999] flex items-center justify-center w-full h-full p-5 bg-black/50  ${
          isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`grid relative w-full notify-popup max-w-sm grid-cols-1 gap-10 p-5 transition-all duration-[0.3s] bg-white rounded-xl shadow-2xl shadow-black/40 place-content-between place-items-center ${
            isActive ? 'translate-y-0' : 'translate-y-10'
          }`}
        >
          <button
            disabled={status === 'loading' && true}
            className="absolute ring-2 ring-transparent active:ring-sky-400 w-7 h-7 p-0 hover:bg-zinc-300 transition-all duration-150 bg-zinc-200 text-zinc-600 rounded-md m-0 flex justify-center items-center top-2.5 right-2.5"
            type="button"
            onClick={() => {
              if (status !== 'loading') return deactivateAlertPopup();
              return false;
            }}
          >
            <BsPlusLg className="rotate-45" />
          </button>
          <TheIcon />
          <p className="font-medium text-center text-md text-zinc-700">
            {message}
          </p>
          <button
            type="button"
            disabled={status === 'loading' && true}
            className="px-4 py-2 ring-transparent ring-2 active:ring-sky-400 text-white transition-all disabled:!bg-zinc-400 duration-150 rounded-md bg-zaxe hover:bg-sky-700"
            onClick={() => {
              if (status !== 'loading') return deactivateAlertPopup();
              return false;
            }}
          >
            {t('popups.global.buttons.ok')}
          </button>
        </div>
      </div>
    )
  );
}

export default AlertPopup;
