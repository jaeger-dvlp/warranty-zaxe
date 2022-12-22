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

  const ContextData = React.useMemo(
    () => ({
      alertPopup,
      authPopup,
      addUserPopup,
      activateAlertPopup,
      activateAuthPopup,
      activateAddUserPopup,
      updateAlertPopup,
      deactivateAlertPopup,
      deactivateAuthPopup,
      deactivateAddUserPopup,
    }),
    [alertPopup, authPopup, addUserPopup]
  );

  return (
    <AppContext.Provider value={ContextData}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => React.useContext(AppContext);
