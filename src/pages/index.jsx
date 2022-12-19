import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

function Home() {
  const { t } = useTranslation();
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
      <section className="flex items-center justify-center w-full p-5 m-0 mt-10 font-zaxe">
        <section className="flex items-start justify-start w-full max-w-app">
          <section className="grid w-full max-w-md grid-cols-1 p-5 xl:max-w-2xl lg:max-w-2xl place-content-start place-items-start ">
            <h1 className="text-xl font-semibold xl:text-3xl lg:text-3xl text-zinc-500">
              {t('pages.home.welcome.heading')}
            </h1>
            <p className="text-xs xl:text-sm lg:text-sm text-zinc-500">
              {t('pages.home.welcome.description')}
            </p>
          </section>
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