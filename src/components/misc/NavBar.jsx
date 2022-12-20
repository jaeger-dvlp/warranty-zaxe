import React from 'react';
import { BiAddToQueue, BiListUl } from 'react-icons/bi';
import { useAppContext } from '@/src/contexts/AppWrapper';

function NavBar() {
  const { activePanel, setActivePanel } = useAppContext();

  const Pages = [
    {
      name: 'Add',
      icon: BiAddToQueue,
    },
    {
      name: 'List',
      icon: BiListUl,
    },
  ];

  const getButtons = () =>
    Pages.map(({ name, icon: Icon }, index) => (
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
    ));

  return (
    <div className="flex items-center justify-center w-full p-0 m-0">
      <div className="flex items-center justify-start w-full gap-5 p-5 bg-white border shadow-xl font-zaxe rounded-xl nav-bar-container border-zinc-100">
        {getButtons()}
      </div>
    </div>
  );
}

export default NavBar;
