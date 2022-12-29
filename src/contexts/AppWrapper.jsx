import React from 'react';

const AppContext = React.createContext();

export default function AppWrapper({ children }) {
  const [alertPopup, setAlertPopup] = React.useState({
    inHTML: false,
    isActive: false,
    status: 'loading',
    message: '',
  });

  const [authPopup, setAuthPopup] = React.useState({
    inHTML: false,
    isActive: false,
  });

  const [addUserPopup, setAddUserPopup] = React.useState({
    inHTML: false,
    isActive: false,
  });

  const [choosePopup, setChoosePopup] = React.useState({
    inHTML: false,
    isActive: false,
    image: null,
    stateChanger: {
      state: null,
      activateState: null,
    },
  });

  const [confirmPopup, setConfirmPopup] = React.useState({
    inHTML: false,
    isActive: false,
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const [editPopup, setEditPopup] = React.useState({
    inHTML: false,
    isActive: false,
    item: null,
  });

  const activateAlertPopup = ({ message, status }) => {
    if (!alertPopup.isActive && !alertPopup.inHTML) {
      setAlertPopup({
        status,
        message,
        inHTML: true,
        isActive: false,
      });
      setTimeout(
        () =>
          setAlertPopup({
            status,
            message,
            inHTML: true,
            isActive: true,
          }),
        100
      );
    }
  };

  const updateAlertPopup = ({ message, status }) => {
    setAlertPopup({
      status,
      message,
      inHTML: true,
      isActive: true,
    });
  };

  const deactivateAlertPopup = () => {
    setAlertPopup({
      ...alertPopup,
      inHTML: true,
      isActive: false,
    });
    setTimeout(
      () =>
        setAlertPopup({
          ...alertPopup,
          inHTML: false,
          isActive: false,
        }),
      350
    );
  };

  const activateAuthPopup = () => {
    if (!authPopup.isActive && !authPopup.inHTML) {
      setAuthPopup({
        inHTML: true,
        isActive: false,
      });
      setTimeout(
        () =>
          setAuthPopup({
            inHTML: true,
            isActive: true,
          }),
        100
      );
    }
  };

  const deactivateAuthPopup = () => {
    setAuthPopup({
      inHTML: true,
      isActive: false,
    });
    setTimeout(
      () =>
        setAuthPopup({
          inHTML: false,
          isActive: false,
        }),
      350
    );
  };

  const activateAddUserPopup = () => {
    if (!addUserPopup.isActive && !addUserPopup.inHTML) {
      setAddUserPopup({
        inHTML: true,
        isActive: false,
      });
      setTimeout(
        () =>
          setAddUserPopup({
            inHTML: true,
            isActive: true,
          }),
        100
      );
    }
  };

  const deactivateAddUserPopup = () => {
    setAddUserPopup({
      inHTML: true,
      isActive: false,
    });
    setTimeout(
      () =>
        setAddUserPopup({
          inHTML: false,
          isActive: false,
        }),
      350
    );
  };

  const activateChoosePopup = ({ image, stateChanger }) => {
    if (!addUserPopup.isActive && !addUserPopup.inHTML) {
      setChoosePopup({
        inHTML: true,
        isActive: false,
        image,
        stateChanger,
      });
      setTimeout(
        () =>
          setChoosePopup({
            inHTML: true,
            isActive: true,
            image,
            stateChanger,
          }),
        100
      );
    }
  };

  const deactivateChoosePopup = () => {
    setChoosePopup({
      inHTML: true,
      isActive: false,
      image: choosePopup.image,
      stateChanger: choosePopup.stateChanger,
    });
    setTimeout(
      () =>
        setChoosePopup({
          inHTML: false,
          isActive: false,
          image: null,
          stateChanger: {
            state: null,
            activateState: null,
          },
        }),
      350
    );
  };

  const activateConfirmPopup = ({ message, onConfirm, onCancel }) => {
    if (!confirmPopup.isActive && !confirmPopup.inHTML) {
      setConfirmPopup({
        inHTML: true,
        isActive: false,
        message,
        onConfirm,
        onCancel,
      });
      setTimeout(
        () =>
          setConfirmPopup({
            inHTML: true,
            isActive: true,
            message,
            onConfirm,
            onCancel,
          }),
        100
      );
    }
  };

  const deactivateConfirmPopup = () => {
    setConfirmPopup({
      inHTML: true,
      isActive: false,
      message: confirmPopup.message,
      onConfirm: confirmPopup.onConfirm,
      onCancel: confirmPopup.onCancel,
    });
    setTimeout(
      () =>
        setConfirmPopup({
          inHTML: false,
          isActive: false,
          message: confirmPopup.message,
          onConfirm: () => {},
          onCancel: () => {},
        }),
      350
    );
  };

  const activateEditPopup = ({ item, onEditComplete }) => {
    setEditPopup({
      inHTML: true,
      isActive: false,
      onEditComplete,
      item,
    });

    setTimeout(
      () =>
        setEditPopup({
          inHTML: true,
          isActive: true,
          onEditComplete,
          item,
        }),
      100
    );
  };

  const deactivateEditPopup = () => {
    setEditPopup({
      inHTML: true,
      isActive: false,
      onEditComplete: editPopup.onEditComplete,
      item: editPopup.item,
    });

    setTimeout(
      () =>
        setEditPopup({
          inHTML: false,
          isActive: false,
          onEditComplete: () => {},
          item: null,
        }),
      350
    );
  };

  const ContextData = React.useMemo(
    () => ({
      alertPopup,
      authPopup,
      addUserPopup,
      choosePopup,
      confirmPopup,
      editPopup,
      activateAlertPopup,
      activateAuthPopup,
      activateAddUserPopup,
      activateChoosePopup,
      activateConfirmPopup,
      activateEditPopup,
      updateAlertPopup,
      deactivateAlertPopup,
      deactivateAuthPopup,
      deactivateAddUserPopup,
      deactivateChoosePopup,
      deactivateConfirmPopup,
      deactivateEditPopup,
    }),
    [alertPopup, authPopup, addUserPopup, choosePopup, confirmPopup, editPopup]
  );

  return (
    <AppContext.Provider value={ContextData}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => React.useContext(AppContext);
