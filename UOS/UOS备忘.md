1. 删除激活信息 `/var/uos/.license.key`
1. 恢复默认激活服务器 os-activator-cmd -s - -default 0 (default 0 https://license.chinauos.com )




country=CN                            
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="\xE6\x81\x92\xE7\xBE\x8E\xE5\x85\xAC\xE5\xAF\x931"
    psk="13876817819"
    key_mgmt=WPA-PSK
}


iwlist wlp3s0b1 scan