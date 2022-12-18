import React from 'react';
import '@/src/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from '@/next-i18next.config';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App, nextI18nextConfig);
