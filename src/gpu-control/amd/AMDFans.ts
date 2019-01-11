// echo 1 > /sys/class/drm/card0/device/hwmon/hwmon0/pwm1_enable
// echo 255 > /sys/class/drm/card0/device/hwmon/hwmon0/pwm1

// pwm[1-5] - this file stores PWM duty cycle or DC value (fan speed) in range:
//    0 (lowest speed) to 255 (full)

// pwm[1-5]_enable - this file controls mode of fan/temperature control:
// * 0 Fan control disabled (fans set to maximum speed)
// * 1 Manual mode, write to pwm[0-5] any value 0-255
// * 2 "Thermal Cruise" mode

enum FanControl {
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
  constructor(private gpuIdx: number, private safeMode = true) {}

  public setFanControl(controlOption: FanControl) {
    return `echo ${controlOption} > ${this.getFanControlPath()}`;
  }
  private getFanControlPath() {
    const i = this.gpuIdx;
    return `/sys/class/drm/card${i}/device/hwmon/hwmon${i}/pwm1_enable`;
  }

  public setFanSpeed(n: number) {
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
    return `/sys/class/drm/card${i}/device/hwmon/hwmon${i}/pwm1`;
  }
}
