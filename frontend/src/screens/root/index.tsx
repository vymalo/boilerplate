import { Outlet } from "react-router-dom";
import ThemeToggle from "@/libs/components/theme.tsx";

export default function RootScreen() {
  return (
    <main>
      <ThemeToggle />
      <Outlet />
    </main>
  );
}