## 16路PWM舵机驱动板（PCA9685）的使用说明

此舵机驱动板使用PCA9685芯片，是16通道12bit PWM舵机驱动，用2个引脚通过I2C就可以驱动16个舵机。

驱动板与树莓派连接
- GND -> RPi GND
- SCL -> RPi SCL1
- SDA -> RPi SDA1
- VCC -> RPi 3.3V或5V
- V+ -> RPi 5V（或通过电源接线柱外接电源供电）

需要注意的是，vcc引脚仅为芯片供电，为舵机供电可以选择通过树莓派5v引脚为v+引脚供电或另接电源到驱动板的电源接线柱上。

![](http://qiniu.creativewriting.cn/rpi-pins-40-0_x.png)

舵机如果没动静，多半是电源线的问题。一般情况下，config.txt文件配置完成后，电源如果接通的话，无需任何代码舵机就会开始旋转至最大角度。

至于如果要连接很多舵机，需要更强大的额外供电。

![](http://qiniu.creativewriting.cn/PCA9685.jpg)

驱动板上一共有3排舵机的接口，如果绿色外接电源口那侧为顶部的话，依次是PWM、v+、GND。舵机线的配色方案有很多种，但是一般来说就是浅色的线接PWM，红色线是电源在中间，深色的线是接GND。

sudo raspi-config 中Interfacing Options有I2C开启yes。

或

/boot/config.txt文件中加入下列代码即可：

```
dtparam=i2c_arm=on
device_tree=bcm2710-rpi-3-b.dtb
```

有的教程里会提到，加入以下代码：

```
dtoverlay=i2c-pwm-pca9685a,addr=0x40
```
千万别加，加入后执行接下去的代码驱动舵机时，会报设备被占用的错。至于为啥，有兴趣了解的小伙伴可以执行百度PCA9685驱动板的原理使用介绍，这块内容网上多的飞起，但是至于实质性如何调用的代码真是少之又少。

配置完成后，重启树莓派。

如果已经安装了i2c-tools工具的话，可以直接用以下代码进行查看，设备是否接入（树莓派1的话最后一个数字改成 0）：

```
sudo i2cdetect -y 1
```

代码及驱动下载地址:https://github.com/adafruit/Adafruit_Python_PCA9685