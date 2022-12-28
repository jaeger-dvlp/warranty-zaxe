import React from 'react';
import '@/src/styles/globals.css';
import '@/src/styles/fonts/fonts.css';
import { appWithTranslation } from 'next-i18next';

import AppWrapper from '@/src/contexts/AppWrapper';
import SupaWrapper from '@/src/contexts/SupaWrapper';
import PanelWrapper from '@/src/contexts/PanelWrapper';

import Header from '@/src/components/misc/Header';
import Loader from '@/src/components/misc/Loader';
import AuthPopup from '@/src/components/popups/AuthPopup';
import EditPopup from '@/src/components/popups/EditPopup';
import AlertPopup from '@/src/components/popups/AlertPopup';
import ChoosePopup from '@/src/components/popups/ChoosePopup';
import ConfirmPopup from '@/src/components/popups/ConfirmPopup';
import AddUserPopup from '@/src/components/popups/AddUserPopup';

function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <SupaWrapper pageProps={pageProps}>
        <PanelWrapper>
          <Header />
          <Loader />
          <AlertPopup />
          <ConfirmPopup />
          <AuthPopup />
          <AddUserPopup />
          <ChoosePopup />
          <EditPopup />
          <Component {...pageProps} />
        </PanelWrapper>
      </SupaWrapper>
    </AppWrapper>
  );
}

export default appWithTranslation(App);
