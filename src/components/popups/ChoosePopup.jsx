import React from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { i18n, useTranslation } from 'next-i18next';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { BsPlusLg } from 'react-icons/bs';

function ChoosePopup() {
  const {
    choosePopup: {
      inHTML,
      isActive,
      stateChanger: { state, activateState },
    },
    activateAlertPopup,
    deactivateChoosePopup,
  } = useAppContext();

  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = React.useState(null);
  const getType = (base64) => base64.split(';')[0]?.split(':')[1];

  React.useEffect(() => {
    setCurrentImage(state);
  }, [state, activateState]);

  const setFile = (file) => {
    if (state?.name !== file.name) {
      activateState(file);
      setCurrentImage(file);

      activateAlertPopup({
        status: 'success',
        message: t('popups.choose.success.image-selected'),
      });
      return setTimeout(() => {
        deactivateChoosePopup();
      }, 150);
    }
    return null;
  };

  const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (activateState) {
            if (!fileTypes.includes(getType(reader.result)))
              return activateAlertPopup({
                status: 'error',
                message: t('popups.choose.errors.invalid-file-type'),
              });

            return setFile({
              name: file.name,
              type: getType(reader.result),
              value: reader.result,
            });
          }
        }

        return null;
      };

      return reader.readAsDataURL(file);
    }

    return null;
  };

  React.useEffect(() => {
    const DropArea = document.querySelector('.img-drop-area');

    const HandleDragOver = (e) => {
      e.preventDefault();
      DropArea.classList.add('dragover');
    };
    const HandleDragLeave = (e) => {
      e.preventDefault();
      DropArea.classList.remove('dragover');
    };
    const HandleDrop = (e) => {
      e.preventDefault();
      DropArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (activateState) {
            if (!fileTypes.includes(getType(reader.result)))
              return activateAlertPopup({
                status: 'error',
                message: t('popups.choose.errors.invalid-file-type'),
              });

            return setFile({
              name: file.name,
              type: getType(reader.result),
              value: reader.result,
            });
          }
        }
        return null;
      };

      return reader.readAsDataURL(file);
    };

    if (DropArea) {
      DropArea.addEventListener('dragover', HandleDragOver);
      DropArea.addEventListener('dragleave', HandleDragLeave);
      DropArea.addEventListener('drop', HandleDrop);
    }

    return () => {
      if (DropArea) {
        DropArea.removeEventListener('dragover', HandleDragOver);
        DropArea.removeEventListener('dragleave', HandleDragLeave);
        DropArea.removeEventListener('drop', HandleDrop);
      }
    };
  }, [inHTML]);

  const getDropArea = () => {
    const { language } = i18n;
    if (language === 'tr') {
      return (
        <p className="p-2 text-sm text-center text-zinc-600">
          Fatura g??rselinizi buraya s??r??kleyin veya{' '}
          <button
            className="transition-all duration-150 text-zaxe hover:text-black"
            onClick={() => document.querySelector('.inv-selector').click()}
            type="button"
          >
            se??in
          </button>{' '}
          .
          <br />
          <span className="text-xs">
            ??zin verilen dosya t??rleri : png, jpg, jpeg
          </span>
        </p>
      );
    }
    return (
      <p className="p-2 text-sm text-center text-zinc-600">
        Drop or{' '}
        <button
          className="transition-all duration-150 text-zaxe hover:text-black"
          onClick={() => document.querySelector('.inv-selector').click()}
          type="button"
        >
          choose
        </button>{' '}
        your invoice image.
        <br />
        <span className="text-xs">Allowed types : png, jpg, jpeg</span>
      </p>
    );
  };

  return (
    inHTML && (
      <div
        onClick={() => deactivateChoosePopup()}
        className={`fixed choose-popup-container font-mark transition-all duration-300 top-0 left-0 z-[999999] flex items-center justify-center w-full h-full p-5 bg-black/50  ${
          isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`grid relative w-full choose-popup max-w-sm grid-cols-1 gap-10 p-5 transition-all duration-[0.3s] bg-white rounded-xl shadow-2xl shadow-black/40 place-content-between place-items-center ${
            isActive ? 'translate-y-0' : 'translate-y-10'
          }`}
        >
          <button
            className="absolute ring-2 ring-transparent active:ring-sky-400 w-7 h-7 p-0 hover:bg-zinc-300 transition-all duration-150 bg-zinc-200 text-zinc-600 rounded-md m-0 flex justify-center items-center top-2.5 right-2.5"
            type="button"
            onClick={deactivateChoosePopup}
          >
            <BsPlusLg className="rotate-45" />
          </button>
          <div className="flex items-center justify-center w-full">
            <span className="relative flex items-center justify-center w-12 h-12 p-2 rounded-lg bg-zinc-200">
              <BiImageAdd className="w-full h-full text-zinc-700" />
            </span>
          </div>
          <input
            type="file"
            className="hidden inv-selector"
            onChange={handleFile}
            multiple={false}
          />
          <p className="grid grid-cols-1 gap-1 text-sm text-center place-content-start place-items-center text-zinc-500">
            <span>{t('popups.choose.label.current-image')};</span>
            <span className="text-xs">
              {(currentImage?.name &&
                `${currentImage?.name.slice('0', '50')}..`) ||
                t('popups.choose.label.not-selected')}
            </span>
          </p>
          <div className="w-full transition-all duration-150 img-drop-area h-[150px] border-2 bg-zinc-100 border-dashed border-zinc-300 rounded-md flex justify-center items-center">
            {getDropArea()}
          </div>
        </div>
      </div>
    )
  );
}

export default ChoosePopup;
