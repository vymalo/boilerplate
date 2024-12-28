import "./index.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { router } from "@mod/router";
import Notification from "@mod/notification";
import Versioning from "@mod/versioning";
import QueryWrapper from "@mod/query";
import PlausibleProvider from "@mod/plausible";

const container = document.getElementById("root")!;
createRoot(container).render(
  <StrictMode>
    <PlausibleProvider hashMode trackLocalhost={import.meta.env.DEV} apiHost="/misc/ps">
      <QueryWrapper>
        <Notification />
        <Versioning />
        <RouterProvider router={router} />
      </QueryWrapper>
    </PlausibleProvider>
  </StrictMode>
);