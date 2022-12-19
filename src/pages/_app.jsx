import React from 'react';
import '@/src/styles/globals.css';
import '@/src/styles/fonts/fonts.css';
import { appWithTranslation } from 'next-i18next';

import Header from '@/src/components/misc/Header';
import AppWrapper from '@/src/contexts/AppWrapper';
import AlertPopup from '../components/popups/AlertPopup';
import Loader from '../components/misc/Loader';

function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Header />
      <Loader />
      <AlertPopup />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default appWithTranslation(App);
