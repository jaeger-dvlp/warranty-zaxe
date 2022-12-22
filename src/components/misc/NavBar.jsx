import React from 'react';
import { BsKeyFill } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { usePanelContext } from '@/src/contexts/PanelWrapper';
import { useUser } from '@supabase/auth-helpers-react';

function NavBar() {
  const { activePanel, setActivePanel, panels } = usePanelContext();

  const pageContext = {
    activePanel,
    setActivePanel,
    panels,
  };

  return (
    <div className="flex items-center justify-center w-full p-0 m-0">
      <div className="flex flex-wrap items-center justify-between w-full gap-5 p-5 bg-white border shadow-xl font-zaxe rounded-xl nav-bar-container border-zinc-100">
        <PageButtons pageContext={pageContext} />
        <AuthButton />
      </div>
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
      {panels.map(({ name, icon: Icon }, index) => (
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
      ))}
    </div>
  );
}

function AuthButton() {
  const { activateAuthPopup } = useAppContext();
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

export default NavBar;
