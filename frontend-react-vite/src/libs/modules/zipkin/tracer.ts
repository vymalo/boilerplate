import { ExplicitContext, Tracer } from 'zipkin';
import type { CreateTracerOptions } from './types';

export function createTracer({ serviceName, recorder }: CreateTracerOptions): Tracer {
  return new Tracer({
    recorder,
    ctxImpl: new ExplicitContext(), // implicit in-process context
    localServiceName: serviceName // name of this application
  });
}