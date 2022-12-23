import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Images from '@/src/images';
import { useRouter } from 'next/router';
import { i18n } from '@/next-i18next.config';
import { BsChevronDown } from 'react-icons/bs';

function Header() {
  const { locales } = i18n;
  const { locale: currentLocale, asPath } = useRouter();

  const getLanguageButtons = () => (
    <span className="absolute flex items-center justify-center invisible w-full pt-1 transition-all duration-300 delay-500 translate-y-5 opacity-0 group-hover:delay-75 group-hover:translate-y-0 top-full group-hover:opacity-100 group-hover:visible ">
      <ul className="w-full top-[10%] grid grid-cols-1 place-content-start place-items-center gap-1">
        {locales
          .map((locale) => {
            if (currentLocale !== locale) {
              return (
                <li key={`lang-button-${locale}`} className="w-full p-0 m-0">
                  <Link
                    href={asPath}
                    className="flex items-center justify-center w-full gap-1 p-1 px-2 text-sm text-center text-black transition-all duration-150 border rounded-md hover:bg-zinc-300 bg-zinc-100 border-zinc-200"
                    locale={locale}
                  >
                    {locale.toUpperCase()}
                  </Link>
                </li>
              );
            }
            return null;
          })
          .filter((locale) => locale !== null)}
      </ul>
    </span>
  );

  return (
    <header className="flex flex-wrap items-center justify-center w-full p-5 m-0 font-zaxe bg-zinc-100">
      <nav className="flex flex-wrap items-center justify-between w-full p-5 bg-white border shadow-xl max-w-app rounded-xl border-zinc-100">
        <Link
          href="/"
          className="transition-all duration-150 hover:scale-110 group"
        >
          <figure className="relative w-[90px] p-2 group-hover:hover:bg-zinc-200 transition-all duration-150 rounded-lg overflow-hidden flex justify-center items-center">
            <Image alt="Zaxe Logo" src={Images.misc.ZaxeLogoDarkGray} />
          </figure>
        </Link>
        <span className="relative w-full group max-w-[55px] overflow-visible flex items-start justify-center mx-3">
          <span className="flex items-center justify-center w-full gap-1 p-1 px-2 text-sm text-center text-black border rounded-md hover:bg-zinc-300 bg-zinc-100 border-zinc-200">
            <span>{currentLocale.toUpperCase()}</span>
            <BsChevronDown className="w-[20px] group-hover:rotate-180 delay-500 group-hover:delay-75 transition-all duration-300" />
          </span>
          {getLanguageButtons()}
        </span>
      </nav>
      <section className="w-full p-2 py-3 h-[3.5rem] peer transition-all duration-150 font-semibold bg-white border-2 rounded-md !outline-none !ring-2 ring-transparent focus:valid:ring-zaxe focus:invalid:ring-pink-400 text-zinc-600 !border-slate-200 !hidden !opacity-0">
        <section className="!hidden !opacity-0 absolute pointer-events-none top-0 px-2 py-0.5 font-semibold duration-150 scale-75 -translate-y-1/2 border rounded-md tranisition-all peer-placeholder-shown:border-transparent border-slate-200 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-focus:border-slate-200 text-slate-500 peer-focus:peer-valid:text-zaxe peer-focus:peer-invalid:text-pink-400 peer-focus:top-0 peer-placeholder-shown:top-7 peer-focus:-translate-x-[10%] max-w-[95%] -translate-x-[10%] peer-placeholder-shown:-translate-x-0 !left-2 placeholder-shown:bg-transparent peer-focus:bg-white bg-white" />
      </section>
    </header>
  );
}

export default Header;
