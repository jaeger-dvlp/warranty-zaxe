import React from 'react';
import { useTranslation } from 'next-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <section className="flex items-center justify-center w-full p-5 py-0 m-0 my-0 fade-in font-zaxe">
      <section className="flex items-start justify-start w-full max-w-app">
        <section className="grid w-full max-w-md grid-cols-1 gap-2 p-5 xl:max-w-2xl lg:max-w-2xl place-content-start place-items-start ">
          <h1 className="text-xl font-semibold xl:text-3xl lg:text-3xl text-zinc-500">
            {t('pages.home.welcome.heading')}
          </h1>
          <p className="text-xs xl:text-sm lg:text-sm text-zinc-500">
            {t('pages.home.welcome.description')}
          </p>
        </section>
      </section>
    </section>
  );
}
