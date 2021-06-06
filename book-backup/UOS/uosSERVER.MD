dpkg -P deepin-license-activator-mini
apt -y install dde #中途有弹框的都选yes
systemctl set-default runlevel5.target
systemctl isolate runlevel5.target”