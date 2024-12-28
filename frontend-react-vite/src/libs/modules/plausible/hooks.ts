import context from "@mod/plausible/context.tsx";
import { useContext } from "react";

export function usePlausible() {
  return useContext(context);
}

export function usePlausibleTrackEvent() {
  const { trackEvent } = usePlausible();
  return trackEvent;
}

export function usePlausibleTrackPageview() {
  const { trackPageview } = usePlausible();
  return trackPageview;
}