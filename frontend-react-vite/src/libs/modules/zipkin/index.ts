import { createZipkinApi } from "./api.ts";

export const zipkinApi = createZipkinApi({
  serviceName: "frontend-app",
  remoteServiceName: "backend-app",
  enabled: true,
  logger: console.log,
  localEndpoint: "/misc/zk",
});