import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import NavBar from '@/src/components/misc/NavBar';
import { useUser } from '@supabase/auth-helpers-react';
import { usePanelContext } from '@/src/contexts/PanelWrapper';

function Home() {
  const { t } = useTranslation();
  const { panels, activePanel } = usePanelContext();
  const user = useUser();

  const getActivePanel = (active) => {
    const Panel = panels[active];
    const Component = Panel.component;

    const FallbackPanel = panels.find(
      ({ requiresAuth }) => requiresAuth === false
    ).component;

    if (Panel.requiresAuth && user) {
      return <Component />;
    }

    if (!Panel.requiresAuth) {
      return <Component />;
    }

    if (Panel.requiresAuth && !user) {
      return <FallbackPanel />;
    }

    return null;
  };

  return (
    <>
      <Head>
        <title>{t('meta.title.home')}</title>
        <meta name="title" content={t('meta.title.home')} />
        <meta name="keywords" content="Warranty, Garanti, Zaxe, Z Eksen" />
        <meta name="description" content={t('meta.desc.home')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://warranty.zaxe.com" />
        <meta property="og:title" content={t('meta.title.home')} />
        <meta property="og:description" content={t('meta.desc.home')} />
        <meta
          property="og:keywords"
          content="Warranty, Garanti, Zaxe, Z Eksen"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://warranty.zaxe.com" />
        <meta property="twitter:site" content="@Zaxe3D" />
        <meta property="twitter:site:id" content="@Zaxe3D" />
        <meta property="twitter:creator" content="@Zaxe3D" />
        <meta property="twitter:creator:id" content="@Zaxe3D" />
        <meta property="twitter:title" content={t('meta.title.home')} />
        <meta property="twitter:description" content={t('meta.desc.home')} />
        <link rel="icon" type="image/png" href="/static/favicon.png" />
        <link rel="apple-touch-icon" href="/static/favicon.png" />
        <link
          rel="alternate"
          hrefLang="tr"
          href="https://warranty.zaxe.com/tr"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://warranty.zaxe.com/en"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://warranty.zaxe.com"
        />
      </Head>
      <section className="flex items-center justify-center w-full p-5 m-0">
        <section className="flex items-center justify-center w-full p-0 max-w-app">
          <NavBar />
        </section>
      </section>
      <section className="flex items-center justify-center w-full p-5 m-0">
        <section className="flex items-center justify-center w-full p-0 max-w-app">
          {getActivePanel(activePanel)}
        </section>
      </section>
    </>
  );
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
