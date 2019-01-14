#!/bin/bash

#Enable manual control on all cards
echo 1 | tee /sys/class/drm/card*/device/hwmon/hwmon*/pwm1_enable

# Set fan speeds to 85%
echo 216 | tee /sys/class/drm/card*/device/hwmon/hwmon*/pwm1