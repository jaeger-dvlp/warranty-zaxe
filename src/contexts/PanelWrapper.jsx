import React from 'react';
import { BiAddToQueue, BiHome, BiListUl } from 'react-icons/bi';

import Add from '@/src/components/panels/Add';
import List from '@/src/components/panels/List';
import Home from '@/src/components/panels/Home';

const PanelContext = React.createContext();

export default function PanelWrapper({ children }) {
  const [activePanel, setActivePanel] = React.useState(0);
  const [panels] = React.useState([
    {
      name: 'components.navbar.buttons.home',
      icon: BiHome,
      component: Home,
      requiresAuth: false,
    },
    {
      name: 'components.navbar.buttons.add',
      icon: BiAddToQueue,
      component: Add,
      requiresAuth: false,
    },
    {
      name: 'components.navbar.buttons.list',
      icon: BiListUl,
      component: List,
      requiresAuth: true,
    },
  ]);

  const ContextData = React.useMemo(
    () => ({ panels, activePanel, setActivePanel }),
    [panels, activePanel]
  );

  return (
    <PanelContext.Provider value={ContextData}>
      {children}
    </PanelContext.Provider>
  );
}

export const usePanelContext = () => React.useContext(PanelContext);
