import { BatchRecorder, ConsoleRecorder, jsonEncoder, type Recorder } from 'zipkin';
import { HttpLogger } from 'zipkin-transport-http';
import { WrappedRecoders } from './recoders';
import type { CreateRecorderOptions } from './types';

export function createRecorder({ logger, localEndpoint }: CreateRecorderOptions = {}): Recorder {
  const recorders: Recorder[] = [];
  const batchRecorder = new BatchRecorder({
    logger: new HttpLogger({
      endpoint: localEndpoint || '/api/v2/spans',
      jsonEncoder: jsonEncoder.JSON_V2
    })
  });
  recorders.push(batchRecorder);

  if (logger) {
    const consoleRecorder = new ConsoleRecorder(logger);
    recorders.push(consoleRecorder);
  }

  return new WrappedRecoders(...recorders);
}