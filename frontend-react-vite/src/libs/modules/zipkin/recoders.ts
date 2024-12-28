import type { Record, Recorder } from 'zipkin';

export class WrappedRecoders implements Recorder {
  private readonly recorders: Recorder[]
  constructor(
    ...recorders: Recorder[]
  ) {
    this.recorders = recorders;
  }

  record(rec: Record): void {
    this.recordAll(rec);
  }

  private async recordAll(rec: Record) {
    for (const recorder of this.recorders) {
      recorder.record(rec);
    }
  }
}