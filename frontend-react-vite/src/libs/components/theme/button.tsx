import { Moon, Sun } from "react-feather";
import { themeChange } from "theme-change";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-daisyui";
import { usePlausibleTrackEvent } from "@mod/plausible";
import { ThemeType } from "@comp/theme/types.ts";
import { calculateNextTheme, loadTheme, saveTheme } from "@comp/theme/utils.ts";


export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>(loadTheme);
  const trackEvent = usePlausibleTrackEvent();

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const nextTheme = useMemo(() => calculateNextTheme(theme), [theme]);

  const trackToggle = useCallback(() => {
    trackEvent("set_theme", {
      props: {
        theme,
        nextTheme
      }
    });
  }, [theme, nextTheme, trackEvent]);

  const onChange = useCallback(() => {
    setTheme((prev) => calculateNextTheme(prev));
    trackToggle();
  }, [trackToggle]);

  return (
    <Button
      size="sm"
      shape="circle"
      responsive
      data-set-theme={nextTheme}
      onClick={onChange}
      data-click-track-event="theme-toggle"
    >
      {/* sun icon */}
      {theme === "vymalo-light" && <Sun className="h-6 w-6" />}

      {/* moon icon */}
      {theme === "vymalo-dark" && <Moon className="h-6 w-6" />}
    </Button>
  );
}