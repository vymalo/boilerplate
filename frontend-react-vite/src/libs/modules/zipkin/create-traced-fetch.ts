import { CreateTracedFetchOptions } from "./types";
import wrapFetch from "zipkin-instrumentation-fetch";

export function createTracedFetch({ tracer, remoteServiceName, serviceName }: CreateTracedFetchOptions) {
  return wrapFetch(fetch, { tracer, remoteServiceName, serviceName });
}