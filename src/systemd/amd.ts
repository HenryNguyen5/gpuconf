import { AMDClocks, AMDFans, FanControl } from "../gpu-control/amd";
import { getParam } from "../utils";

export interface AMDScriptParams {
  gpuOffset: number;
  numOfGpus: number;
  coreClocks: number[];
  coreMvs: number[];
  memoryClocks: number[];
  fanSpeeds: number[];
}

function createAMDScriptHeader() {
  const scripts: string[] = [];
  return scripts.join("\n");
}
