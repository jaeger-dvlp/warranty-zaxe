import React from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function ResetPassword() {
  const { t } = useTranslation();

  const Router = useRouter();
  const supabase = useSupabaseClient();

  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();

      if (data) {
        setSession(data);
      }
    };

    supabase.auth.onAuthStateChange((_event, theSession) => {
      setSession(theSession);
    });

    init();
  }, []);

  React.useEffect(() => {
    if (session !== null && !session.session) {
      Router.push('/');
    }
  }, [session]);

  if (!session?.session) return null;

  return (
    <section className="grid w-full grid-cols-1 font-zaxe place-content-start place-items-center">
      <section className="flex items-start justify-start w-full py-5 my-5 max-w-app">
        <section className="grid w-full max-w-md grid-cols-1 gap-2 p-5 xl:max-w-2xl lg:max-w-2xl place-content-start place-items-start ">
          <h1 className="text-xl font-semibold xl:text-3xl lg:text-3xl text-zinc-500">
            {t('pages.resetpwd.welcome.heading')}
          </h1>
          <p className="text-xs xl:text-sm lg:text-sm text-zinc-500">
            {t('pages.resetpwd.welcome.description')}
          </p>
        </section>
      </section>
      <section className="flex items-start justify-start w-full max-w-app">
        <div className="w-full p-5 bg-white border shadow-xl rounded-xl border-zinc-100">
          Yo yo yo, mr white.
        </div>
      </section>
    </section>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ResetPassword;
