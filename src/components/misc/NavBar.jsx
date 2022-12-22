import React from 'react';
import {
  BsBoxArrowInRight,
  BsFillPersonPlusFill,
  BsKeyFill,
} from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { usePanelContext } from '@/src/contexts/PanelWrapper';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

function NavBar() {
  const { activePanel, setActivePanel, panels } = usePanelContext();

  const pageContext = {
    activePanel,
    setActivePanel,
    panels,
  };

  return (
    <div className="flex items-center justify-center w-full p-0 m-0">
      <div className="relative flex flex-wrap items-center justify-between w-full gap-5 p-5 bg-white border shadow-xl font-zaxe rounded-xl nav-bar-container border-zinc-100">
        <UserDetails />
        <PageButtons pageContext={pageContext} />
        <div className="flex items-center justify-center gap-5 max-w-fit">
          <AuthButton />
          <AddUserPopup />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

function UserDetails() {
  const user = useUser();

  if (!user) return null;

  return (
    <div className="absolute fade-in left-0 p-3 text-xs -top-0 -translate-y-[125%] bg-white shadow-xl rounded-md text-zinc-600">
      Hello, {user.email}. 👋
    </div>
  );
}

function PageButtons({ pageContext: { panels, setActivePanel, activePanel } }) {
  const { t } = useTranslation();
  const user = useUser();
  const { activateAuthPopup } = useAppContext();
  const changePanel = (index) => {
    const requestedPanel = panels[index];

    if (requestedPanel.requiresAuth && !user) return activateAuthPopup();

    return setActivePanel(index);
  };

  return (
    <div className="flex flex-wrap items-start justify-start w-full gap-5 max-w-fit">
      {panels
        .map(({ name, icon: Icon, requiresAuth }, index) => {
          if (requiresAuth && !user) {
            return null;
          }

          if (requiresAuth && user) {
            return (
              <button
                key={`button-${name.toLowerCase()}`}
                onClick={() => changePanel(index)}
                className={`${
                  index === activePanel
                    ? 'bg-zaxe/20 text-zaxe border border-sky-300'
                    : 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 border text-zinc-600'
                } flex fade-in items-center justify-center gap-1 p-1 px-2 font-semibold text-center transition-all duration-100  rounded-md ring-0 !ring-sky-400 active:ring`}
                type="button"
              >
                <Icon className="w-4 h-4" />
                <span>{t(name)}</span>
              </button>
            );
          }

          if (!requiresAuth) {
            return (
              <button
                key={`button-${name.toLowerCase()}`}
                onClick={() => changePanel(index)}
                className={`${
                  index === activePanel
                    ? 'bg-zaxe/20 text-zaxe border border-sky-300'
                    : 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 border text-zinc-600'
                } flex items-center justify-center gap-1 p-1 px-2 font-semibold text-center transition-all duration-100  rounded-md ring-0 !ring-sky-400 active:ring`}
                type="button"
              >
                <Icon className="w-4 h-4" />
                <span>{t(name)}</span>
              </button>
            );
          }
          return null;
        })
        .filter((item) => item !== null)}
    </div>
  );
}

function AuthButton() {
  const { activateAuthPopup } = useAppContext();
  const user = useUser();

  if (user) return null;
  return (
    <button
      onClick={() => activateAuthPopup()}
      className="bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 border text-zinc-600 flex items-center justify-center gap-1 p-1 px-2 font-semibold text-center transition-all duration-100  rounded-md ring-0 !ring-sky-400 active:ring"
      type="button"
    >
      <BsKeyFill className="w-6 h-6" />
    </button>
  );
}

function LogoutButton() {
  const user = useUser();
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { setActivePanel } = usePanelContext();
  const { activateAlertPopup, updateAlertPopup } = useAppContext();

  const signOut = async () => {
    try {
      activateAlertPopup({
        status: 'loading',
        message: t('popups.auth.loading.logging-out'),
      });

      return await supabase.auth
        .signOut()
        .then(() => {
          updateAlertPopup({
            status: 'success',
            message: t('popups.auth.success.logged-out'),
          });
          return setActivePanel(0);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      return updateAlertPopup({
        status: 'error',
        message: error.message || t('popups.global.errors.error-occurred'),
      });
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 border text-zinc-600 flex items-center justify-center gap-1 p-1 px-2 font-semibold text-center transition-all duration-100  rounded-md ring-0 !ring-sky-400 active:ring"
      type="button"
    >
      <BsBoxArrowInRight className="w-6 h-6" />
    </button>
  );
}

function AddUserPopup() {
  const { activateAddUserPopup } = useAppContext();
  const user = useUser();

  if (!user) return null;

  return (
    <button
      onClick={() => activateAddUserPopup()}
      className="bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 border text-zinc-600 flex items-center justify-center gap-1 p-1 px-2 font-semibold text-center transition-all duration-100  rounded-md ring-0 !ring-sky-400 active:ring"
      type="button"
    >
      <BsFillPersonPlusFill className="w-6 h-6" />
    </button>
  );
}

export default NavBar;
