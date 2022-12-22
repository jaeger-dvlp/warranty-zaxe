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
import AlertPopup from '@/src/components/popups/AlertPopup';

function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <SupaWrapper pageProps={pageProps}>
        <PanelWrapper>
          <Header />
          <Loader />
          <AlertPopup />
          <AuthPopup />
          <Component {...pageProps} />
        </PanelWrapper>
      </SupaWrapper>
    </AppWrapper>
  );
}

export default appWithTranslation(App);
