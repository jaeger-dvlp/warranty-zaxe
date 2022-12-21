import React from 'react';
import { useRouter } from 'next/router';

function Loader() {
  const { locale, asPath } = useRouter();

  const [loader, setLoader] = React.useState({
    isActive: true,
    inHTML: true,
  });

  const HideLoader = () => {
    setTimeout(() => setLoader({ isActive: false, inHTML: true }), 1000);
    setTimeout(() => setLoader({ isActive: false, inHTML: false }), 1500);
  };

  const StartLoader = () => {
    setLoader({
      isActive: true,
      inHTML: true,
    });
    HideLoader();
  };

  React.useEffect(() => StartLoader(), [locale, asPath]);

  return (
    loader.inHTML && (
      <div
        className={`${
          loader.isActive
            ? 'transition-none duration-[0ms] !opacity-100 !visible'
            : 'transition-all duration-500 !opacity-0 !invisible'
        } zaxe-app-loader fixed !z-[99999999999999] top-0 bg-white left-0 w-screen h-screen`}
      />
    )
  );
}

export default Loader;
