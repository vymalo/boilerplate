import { createRecorder } from "./create-recorder";
import { createTracer } from "./tracer";
import { createTracedFetch } from "./create-traced-fetch";
import type { TypeFetch } from "./types";

export interface CreateApiOptions {
  serviceName: string;
  localEndpoint?: string;
  remoteServiceName: string;
  logger?: (message: string) => void;
  enabled?: boolean;
}

export function createZipkinApi(options: CreateApiOptions): TypeFetch {
  if (!options.enabled) {
    return fetch;
  }

  const recorder = createRecorder({
    logger: options.logger,
    localEndpoint: options.localEndpoint
  });

  const tracer = createTracer({
    serviceName: options.serviceName,
    recorder
  });

  return createTracedFetch({
    tracer,
    remoteServiceName: options.remoteServiceName,
    serviceName: options.serviceName
  });
}