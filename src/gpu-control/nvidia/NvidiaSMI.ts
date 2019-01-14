import { NvidiaScriptParams } from "../../systemd/nvidia";

import { getParam } from "../../utils";

export class NvidiaSMIQueryBuilder {
  constructor(private gpuIdx: number, private safeMode = true) {}

  public static cmd() {
    return "nvidia-smi";
  }

  public static enablePersistence() {
    return "-pm ENABLED";
  }

  public static createNvidiaSMIScript(config: NvidiaScriptParams) {
    const scripts: string[] = [];
    for (let i = 0; i < config.numGpus; i++) {
      const smiBuilder = new NvidiaSMIQueryBuilder(i);
      const { powerLimits } = config;

      scripts.push(
        [
          NvidiaSMIQueryBuilder.cmd(),
          smiBuilder.setPowerLimit(getParam(powerLimits, i))
        ]
          .filter(x => x !== null)
          .join(" ")
      );
    }

    return scripts.join("\n");
  }

  public setPowerLimit(lim?: number) {
    if (lim === undefined) {
      return null;
    }
    if (this.safeMode && lim > 250) {
      throw Error("Unsafe power limit detected, not setting");
    }

    return this.queryStr(`-pl ${lim}`);
  }

  private queryStr(arg: string) {
    return `-i ${this.gpuIdx} ${arg}`;
  }
}
