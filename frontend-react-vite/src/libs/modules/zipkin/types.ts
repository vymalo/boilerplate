import type { Recorder, Tracer } from "zipkin";

export interface CreateTracerOptions {
  recorder: Recorder;
  serviceName: string; // E.g 'frontend-app'
}

export interface CreateTracedFetchOptions {
  tracer: Tracer;
  remoteServiceName: string;
  serviceName?: string;
}

export interface CreateRecorderOptions {
  logger?: (message: string) => void;
  localEndpoint?: string;
}

export type TypeFetch = typeof fetch;