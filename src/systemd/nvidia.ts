import {
  NvidiaSMIQueryBuilder,
  NvidiaSettingsQueryBuilder
} from "../gpu-control/nvidia";

export interface NvidiaScriptParams {
  numGpus: number;
  fanSpeeds: number[];
  coreOffsets: number[];
  memoryOffsets: number[];
  powerLimits: number[];
}

export function createNvidiaScript(config: NvidiaScriptParams) {
  const header = createNvidiaScriptHeader();
  const body = createNvidiaScriptBody(config);
  return [header, body].join("\n\n");
}

function createNvidiaScriptHeader(): string {
  const scripts: string[] = [];

  scripts.push("#!/bin/bash\n");
  scripts.push("# BEGIN HEADER #");
  scripts.push(
    "nvidia-xconfig --enable-all-gpus --cool-bits=28 --allow-empty-initial-configuration"
  );
  scripts.push("X :0 &");
  scripts.push(
    [
      NvidiaSMIQueryBuilder.cmd(),
      NvidiaSMIQueryBuilder.enablePersistence()
    ].join(" ")
  );
  scripts.push("export DISPLAY=:0");
  scripts.push("# END HEADER #");

  return scripts.join("\n");
}

function createNvidiaScriptBody(config: NvidiaScriptParams): string {
  const scripts: string[] = [];
  scripts.push("# BEGIN BODY #");

  scripts.push(NvidiaSettingsQueryBuilder.createNvidiaSettingsScript(config));
  scripts.push(NvidiaSMIQueryBuilder.createNvidiaSMIScript(config));

  scripts.push("# END BODY #");

  return scripts.join("\n\n");
}

console.log(
  createNvidiaScript({
    coreOffsets: [0],
    fanSpeeds: [85],
    numGpus: 13,
    powerLimits: [125],
    memoryOffsets: [200]
  })
);
