import React from 'react';
import { useTranslation } from 'next-i18next';
import { BiAddToQueue, BiEdit, BiListUl } from 'react-icons/bi';

import Edit from '@/src/components/panels/Edit';
import List from '@/src/components/panels/List';
import WarrantyForm from '@/src/components/forms/WarrantyForm';

const PageContext = React.createContext();

export default function PageWrapper({ children }) {
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = React.useState(0);
  const [panels] = React.useState([
    {
      name: t('components.navbar.buttons.add'),
      icon: BiAddToQueue,
      component: WarrantyForm,
    },
    {
      name: t('components.navbar.buttons.edit'),
      icon: BiEdit,
      component: Edit,
    },
    {
      name: t('components.navbar.buttons.list'),
      icon: BiListUl,
      component: List,
    },
  ]);

  const ContextData = React.useMemo(
    () => ({ panels, activePanel, setActivePanel }),
    [panels, activePanel]
  );

  return (
    <PageContext.Provider value={ContextData}>{children}</PageContext.Provider>
  );
}

export const usePageContext = () => React.useContext(PageContext);
