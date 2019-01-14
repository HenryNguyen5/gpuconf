#!/bin/bash

# BEGIN HEADER #
nvidia-xconfig --enable-all-gpus --cool-bits=28 --allow-empty-initial-configuration
X :0 &
nvidia-smi -pm ENABLED
export DISPLAY=:0
# END HEADER #

# BEGIN BODY #

nvidia-settings -a [gpu:0]/GPUFanControlState=1 -a [fan:0]/GPUTargetFanSpeed=75 -a [gpu:1]/GPUFanControlState=1 -a [fan:1]/GPUTargetFanSpeed=75 -a [gpu:2]/GPUFanControlState=1 -a [fan:2]/GPUTargetFanSpeed=75 -a [gpu:3]/GPUFanControlState=1 -a [fan:3]/GPUTargetFanSpeed=75 -a [gpu:4]/GPUFanControlState=1 -a [fan:4]/GPUTargetFanSpeed=75 -a [gpu:5]/GPUFanControlState=1 -a [fan:5]/GPUTargetFanSpeed=75 -a [gpu:6]/GPUFanControlState=1 -a [fan:6]/GPUTargetFanSpeed=75 -a [gpu:7]/GPUFanControlState=1 -a [fan:7]/GPUTargetFanSpeed=75 -a [gpu:8]/GPUFanControlState=1 -a [fan:8]/GPUTargetFanSpeed=75 -a [gpu:9]/GPUFanControlState=1 -a [fan:9]/GPUTargetFanSpeed=75 -a [gpu:10]/GPUFanControlState=1 -a [fan:10]/GPUTargetFanSpeed=75 -a [gpu:11]/GPUFanControlState=1 -a [fan:11]/GPUTargetFanSpeed=75 -a [gpu:12]/GPUFanControlState=1 -a [fan:12]/GPUTargetFanSpeed=75

nvidia-smi -i 0 -pl 125
nvidia-smi -i 1 -pl 125
nvidia-smi -i 2 -pl 125
nvidia-smi -i 3 -pl 125
nvidia-smi -i 4 -pl 125
nvidia-smi -i 5 -pl 125
nvidia-smi -i 6 -pl 125
nvidia-smi -i 7 -pl 125
nvidia-smi -i 8 -pl 125
nvidia-smi -i 9 -pl 125
nvidia-smi -i 10 -pl 125
nvidia-smi -i 11 -pl 125
nvidia-smi -i 12 -pl 125

# END BODY #
