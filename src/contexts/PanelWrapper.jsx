import React from 'react';
import { BiAddToQueue, BiEdit, BiListUl } from 'react-icons/bi';

import Add from '@/src/components/panels/Add';
import Edit from '@/src/components/panels/Edit';
import List from '@/src/components/panels/List';

const PanelContext = React.createContext();

export default function PanelWrapper({ children }) {
  const [activePanel, setActivePanel] = React.useState(0);
  const [panels] = React.useState([
    {
      name: 'components.navbar.buttons.add',
      icon: BiAddToQueue,
      component: Add,
    },
    {
      name: 'components.navbar.buttons.edit',
      icon: BiEdit,
      component: Edit,
    },
    {
      name: 'components.navbar.buttons.list',
      icon: BiListUl,
      component: List,
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
