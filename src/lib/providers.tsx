"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { persistor, reduxStore } from "@/lib/redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          {props.children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};
