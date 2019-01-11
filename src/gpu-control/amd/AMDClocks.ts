const DEFAULT_CORE_CLOCKS = `OD_SCLK:
0: 300MHz 950mV
1: 608MHz 955mV
2: 910MHz 960mV
3: 930MHz 965mV
4: 940MHz 970mV
5: 950MHz 975mV
6: 1000MHz 980mV
7: 1020MHz 985mV`;

const FILE_LOCATION = "/etc/default/amdgpu-custom-states.card";

interface ClockConfig {
  state: number;
  coreMHz: number;
  voltageMV: number;
}

enum Component {
  MEMORY = "MCLK",
  CORE = "SCLK"
}

enum PerformanceLevel {
  AUTO = "auto",
  LOW = "low",
  HIGH = "high",
  MANUAL = "manual"
}

export class AMDClocks {
  public coreClockHeader() {
    return this.overdriveHeader(Component.CORE);
  }
  public setCoreClock(config: ClockConfig) {
    return this.setStateClockVoltage(config);
  }
  public setCoreStates(states: number[]) {
    return this.setStates(Component.CORE, states);
  }

  public memoryClockHeader() {
    return this.overdriveHeader(Component.MEMORY);
  }
  public setMemoryClock(config: ClockConfig) {
    return this.setStateClockVoltage(config);
  }
  public setMemoryStates(states: number[]) {
    return this.setStates(Component.MEMORY, states);
  }

  public setPerformanceLevel(level: PerformanceLevel) {
    return `FORCE_LEVEL: ${level}`;
  }

  private setStateClockVoltage(config: ClockConfig) {
    const { state, coreMHz, voltageMV } = config;
    return `${state}: ${coreMHz}MHz ${voltageMV}mV`;
  }
  private setStates(component: Component, states: number[]) {
    return `FORCE_${component}: ${states.join(" ")}`;
  }
  private overdriveHeader(component: Component) {
    return `OD_${component}`;
  }
}
