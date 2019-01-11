import { NvidiaScriptParams } from "../../systemd/nvidia";
import { getParam } from "../../utils";

enum GPUQueryParam {
  FAN_SPEED = "GPUTargetFanSpeed",
  FAN_CONTROL = "GPUFanControlState",
  CORE_OFFSET = "GPUGraphicsClockOffset[3]",
  MEM_OFFSET = "GPUMemoryTransferRateOffset[3]"
}

export class NvidiaSettingsQueryBuilder {
  constructor(private gpuIdx: number, private safeMode = true) {}

  public static cmd(): string {
    return `nvidia-settings`;
  }

  public static createNvidiaSettingsScript(config: NvidiaScriptParams) {
    const scripts: string[] = [];
    scripts.push(NvidiaSettingsQueryBuilder.cmd());

    for (let i = 0; i < config.numGpus; i++) {
      const sBuilder = new NvidiaSettingsQueryBuilder(i);
      const { coreOffsets, fanSpeeds, memoryOffsets } = config;

      scripts.push(
        [
          sBuilder.setFanControl(true),
          sBuilder.setFanSpeed(getParam(fanSpeeds, i)),
          sBuilder.setCoreOffset(getParam(coreOffsets, i)),
          sBuilder.setMemoryOffset(getParam(memoryOffsets, i))
        ].join(" ")
      );
    }

    return scripts.join(" ");
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
    return `-a ${arg}=${n}`;
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
