## 16路PWM舵机驱动板（PCA9685）的使用说明

此舵机驱动板使用PCA9685芯片，是16通道12bit PWM舵机驱动，用2个引脚通过I2C就可以驱动16个舵机。

驱动板与树莓派连接
- GND -> RPi GND
- SCL -> RPi SCL1
- SDA -> RPi SDA1
- VCC -> RPi 3.3V或5V

![](http://qiniu.creativewriting.cn/rpi-pins-40-0_x.png)