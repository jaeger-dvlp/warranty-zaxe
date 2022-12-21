import React from 'react';
import { BsKeyFill } from 'react-icons/bs';
import { usePanelContext } from '@/src/contexts/PanelWrapper';

function NavBar() {
  const { activePanel, setActivePanel, panels } = usePanelContext();

  const pageContext = {
    activePanel,
    setActivePanel,
    panels,
  };

  return (
    <div className="flex items-center justify-center w-full p-0 m-0">
      <div className="flex items-center justify-between w-full gap-5 p-5 bg-white border shadow-xl font-zaxe rounded-xl nav-bar-container border-zinc-100">
        <PageButtons pageContext={pageContext} />
        <AuthButton />
      </div>
    </div>
  );
}

function PageButtons({ pageContext: { panels, setActivePanel, activePanel } }) {
  return (
    <div className="flex items-start justify-start w-full gap-5">
      {panels.map(({ name, icon: Icon }, index) => (
        <button
          key={`button-${name.toLowerCase()}`}
          onClick={() => setActivePanel(index)}
          className={`${
            index === activePanel
              ? 'bg-zaxe/20 text-zaxe border border-sky-300'
              : 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 border text-zinc-600'
          } flex items-center justify-center gap-1 p-1 px-2 font-semibold text-center transition-all duration-100  rounded-md ring-0 !ring-sky-400 active:ring`}
          type="button"
        >
          <Icon className="w-4 h-4" />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}

function AuthButton() {
  return (
    <button
      onClick={() => null}
      className="bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 border text-zinc-600 flex items-center justify-center gap-1 p-1 px-2 font-semibold text-center transition-all duration-100  rounded-md ring-0 !ring-sky-400 active:ring"
      type="button"
    >
      <BsKeyFill className="w-6 h-6" />
    </button>
  );
}

export default NavBar;
