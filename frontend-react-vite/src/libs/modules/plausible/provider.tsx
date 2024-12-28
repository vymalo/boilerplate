import context from "@mod/plausible/context.tsx";
import type { PlausibleInitOptions } from "plausible-tracker/build/main/lib/tracker";
import { PropsWithChildren, useEffect } from "react";
import Plausible from "plausible-tracker";

interface PropsPlausibleProvider {
  autoPageviews?: boolean;
  autoOutboundTracking?: boolean;
}

export default function PlausibleProvider({
                                            children,
                                            autoOutboundTracking,
                                            autoPageviews,
                                            ...options
                                          }: PropsWithChildren<PlausibleInitOptions & PropsPlausibleProvider>) {
  const plausible = Plausible(options);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    if (autoPageviews) {
      const cleanup = plausible.enableAutoPageviews();
      cleanups.push(cleanup);
    }

    if (autoOutboundTracking) {
      const cleanup = plausible.enableAutoOutboundTracking();
      cleanups.push(cleanup);
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <context.Provider value={plausible}>
      {children}
    </context.Provider>
  );
}