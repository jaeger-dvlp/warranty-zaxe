import React from 'react';
import '@/src/styles/globals.css';
import '@/src/styles/fonts/fonts.css';
import { appWithTranslation } from 'next-i18next';

import Header from '@/src/components/misc/Header';
import AppWrapper from '@/src/contexts/AppWrapper';
import AlertPopup from '../components/popups/AlertPopup';
import Loader from '../components/misc/Loader';
import PanelWrapper from '../contexts/PanelWrapper';

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
