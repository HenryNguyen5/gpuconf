export const MINER_CONFIG_SERVICE = `[Unit]
Description=Miner Configuration
After=network-online.target

[Service]
Type=forking
ExecStart=/usr/local/bin/miner-config &

[Install]
WantedBy=network-online.target`;

export const MINER_CONFIG_SCRIPT_HEADER = `#!/bin/bash
sleep 15`;
