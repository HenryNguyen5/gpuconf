sudo chown m1 /etc/netplan/50-cloud-init.yaml

cat /etc/netplan/50-cloud-init.yaml
sudo netplan apply

touch /usr/local/bin/miner-config.sh
chown m1 /usr/local/bin/miner-config.sh
chmod +x  /usr/local/bin/miner-config.sh

touch /etc/systemd/system/miner-config.service
chown m1 /etc/systemd/system/miner-config.service

scp miner-config.sh m1@192.168.0.6:/usr/local/bin/miner-config.sh
scp miner-config.service m1@192.168.0.6:/etc/systemd/system/miner-config.service

systemctl enable miner-config
