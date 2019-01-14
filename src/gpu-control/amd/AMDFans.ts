import { AMDScriptParams } from "../../systemd/amd";
import { getParam } from "../../utils";

// echo 1 > /sys/class/drm/card0/device/hwmon/hwmon0/pwm1_enable
// echo 255 > /sys/class/drm/card0/device/hwmon/hwmon0/pwm1

// pwm[1-5] - this file stores PWM duty cycle or DC value (fan speed) in range:
//    0 (lowest speed) to 255 (full)

// pwm[1-5]_enable - this file controls mode of fan/temperature control:
// * 0 Fan control disabled (fans set to maximum speed)
// * 1 Manual mode, write to pwm[0-5] any value 0-255
// * 2 "Thermal Cruise" mode

export enum FanControl {
  DISABLED = 0,
  MANUAL = 1,
  AUTO = 2
}

enum FanSpeed {
  MIN = 0,
  SAFE_MIN = 20,
  MAX = 255
}

export class AMDFans {
  constructor(
    private gpuIdx: number,
    private gpuOffset: number,
    private safeMode = true
  ) {}

  public static createAMDFanControlScript(config: AMDScriptParams) {
    const scripts: string[] = [];
    const { fanSpeeds, numOfGpus, gpuOffset } = config;
    for (let i = 0; i < numOfGpus; i++) {
      const fanBuilder = new AMDFans(i, gpuOffset);
      scripts.push(fanBuilder.setFanControl(FanControl.MANUAL));
      const fanSpeed = fanBuilder.setFanSpeed(getParam(fanSpeeds, i));
      if (fanSpeed) {
        scripts.push(fanSpeed);
      }
    }
    if (scripts.length === numOfGpus) {
      return "";
    }
    return scripts.join("\n");
  }

  public setFanControl(controlOption: FanControl) {
    return `echo ${controlOption} > ${this.getFanControlPath()}`;
  }

  private getFanControlPath() {
    const i = this.gpuIdx;
    const j = i - this.gpuOffset;
    return `/sys/class/drm/card${i}/device/hwmon/hwmon${i - j}/pwm1_enable`;
  }

  public setFanSpeed(n?: number) {
    if (n == null) {
      return null;
    }
    if (
      n > FanSpeed.MAX ||
      n < (this.safeMode ? FanSpeed.SAFE_MIN : FanSpeed.MIN)
    ) {
      throw Error("Invalid fan speed");
    }
    return `echo ${n} > ${this.getFanSpeedPath()}`;
  }

  private getFanSpeedPath() {
    const i = this.gpuIdx;
    const j = i - this.gpuOffset;
    return `/sys/class/drm/card${i}/device/hwmon/hwmon${i - j}/pwm1`;
  }
}
