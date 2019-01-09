enum GPUQueryParam {
  FAN_SPEED = "GPUTargetFanSpeed",
  FAN_CONTROL = "GPUFanControlState",
  CORE_OFFSET = "GPUGraphicsClockOffset",
  MEM_OFFSET = "GPUMemoryTransferRateOffset"
}

class NvidiaSettingsQueryBuilder {
  constructor(
    private gpuIdx: number,
    private safeMode = true,
    private display = ":0"
  ) {}

  public cmd(): string {
    return `nvidia-settings -c ${this.display}`;
  }

  public setFanControl(enable: boolean) {
    const q = this.gpuQueryStr(GPUQueryParam.FAN_CONTROL);
    return this.modify(q, +enable);
  }

  public setFanSpeed(n: number) {
    if (n > 100 || n < (this.safeMode ? 20 : 0)) {
      throw Error(`Fan speed of ${n} unsupported`);
    }
    const q = this.fanQueryStr(GPUQueryParam.FAN_SPEED);
    return this.modify(q, n);
  }

  public setCoreOffset(offset: number) {
    const q = this.gpuQueryStr(GPUQueryParam.CORE_OFFSET);
    return this.modify(q, offset);
  }

  public setMemoryOffset(offset: number) {
    const q = this.gpuQueryStr(GPUQueryParam.MEM_OFFSET);
    return this.modify(q, offset);
  }

  private modify(arg: string, n: number) {
    return ` -a ${arg}=${n}`;
  }

  private queryStr(selector: string, query: GPUQueryParam) {
    return `[${selector}]/${query}`;
  }

  private gpuQueryStr(query: GPUQueryParam) {
    return this.queryStr(`gpu:${this.gpuIdx}`, query);
  }

  private fanQueryStr(query: GPUQueryParam) {
    return this.queryStr(`fan:${this.gpuIdx}`, query);
  }
}
