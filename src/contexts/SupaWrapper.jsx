import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import React from 'react';

const SupaContext = React.createContext();

export default function SupaWrapper({ children, pageProps }) {
  const [supabase] = React.useState(() => createBrowserSupabaseClient());

  const ContextData = React.useMemo(
    () => ({
      supabase,
    }),
    [supabase]
  );
  return (
    <SupaContext.Provider value={ContextData}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        {children}
      </SessionContextProvider>
    </SupaContext.Provider>
  );
}

export const useSupaContext = () => React.useContext(SupaContext);
