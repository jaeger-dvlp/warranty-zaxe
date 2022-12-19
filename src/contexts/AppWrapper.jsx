import React from 'react';

const AppContext = React.createContext();

export default function AppWrapper({ children }) {
  const [alertPopup, setAlertPopup] = React.useState({
    inHTML: false,
    isActive: false,
    status: 'loading',
    message: '',
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

  const ContextData = React.useMemo(
    () => ({
      alertPopup,
      activateAlertPopup,
      updateAlertPopup,
      deactivateAlertPopup,
    }),
    [alertPopup]
  );

  return (
    <AppContext.Provider value={ContextData}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => React.useContext(AppContext);
