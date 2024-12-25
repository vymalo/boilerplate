import { Moon, Sun } from "react-feather";
import { themeChange } from "theme-change";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-daisyui";
import { get, set } from "idb-keyval";
import { baseStore } from "@mod/storage";

const defaultTheme = "vymalo-light";

const calculateNextTheme = (theme: string) => {
  if (theme === "vymalo-light") {
    return "vymalo-dark";
  }
  if (theme === "vymalo-dark") {
    return "vymalo-light";
  }
  return defaultTheme;
};

type ThemeType = ReturnType<typeof calculateNextTheme>;

const store = baseStore("theme");

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  useEffect(() => {
    set("theme", theme, store);
  }, [theme]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  useEffect(() => {
    get("theme", store).then((value: ThemeType) => {
      if (value) {
        setTheme(value);
      }
    });
  }, []);

  const onChange = useCallback(() => {
    setTheme((prev) => calculateNextTheme(prev));
  }, []);

  const nextTheme = useMemo(() => calculateNextTheme(theme), [theme]);

  return (
    <Button
      size="sm"
      shape="circle"
      responsive
      data-set-theme={nextTheme}
      onClick={onChange}
      data-click-track-event="theme-toggle"
      data-click-track-properties={{ theme, nextTheme }}
    >
      {/* sun icon */}
      {theme === "vymalo-light" && <Sun className="h-6 w-6" />}

      {/* moon icon */}
      {theme === "vymalo-dark" && <Moon className="h-6 w-6" />}
    </Button>
  );
}