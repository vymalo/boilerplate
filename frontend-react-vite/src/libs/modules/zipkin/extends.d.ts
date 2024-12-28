declare module "zipkin-instrumentation-fetch" {
  import { CreateTracedFetchOptions, TypeFetch } from "./types";

  export default function wrapFetch(fetch: TypeFetch, options: CreateTracedFetchOptions): TypeFetch;
}