import React from 'react';
import '@/src/styles/globals.css';
import '@/src/styles/fonts/fonts.css';
import { appWithTranslation } from 'next-i18next';

import AppWrapper from '@/src/contexts/AppWrapper';
import PanelWrapper from '@/src/contexts/PanelWrapper';

import Header from '@/src/components/misc/Header';
import Loader from '@/src/components/misc/Loader';
import AlertPopup from '@/src/components/popups/AlertPopup';

function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <PanelWrapper>
        <Header />
        <Loader />
        <AlertPopup />
        <Component {...pageProps} />
      </PanelWrapper>
    </AppWrapper>
  );
}

export default appWithTranslation(App);
