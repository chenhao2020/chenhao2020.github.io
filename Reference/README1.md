There are 4 big wire inputs, marked with B-, B+, M+ and M-

the B and the M stand for Battery and Motor.

there are 8 small pins on the H-bridge, which are

VCC    R_IS    R_EN    RPWM
GND    L_IS    L_EN    LPWM

 the left two (VCC and GND) are 5V power supply and ground

![](http://qiniu.creativewriting.cn/2mIQj.jpg)
![](http://qiniu.creativewriting.cn/IBT-2-Input-Ports.jpg)

- Connect the external power supply +/- to the numbers 2 and 1 respectively (see the image below for the numbers). It works: I measured the voltage with a voltmeter between 2 and 1, and it shows 12V.
- Connect the Raspberry Pi PINs 2 and 6 (i.e. 5V and GND) to the letters B and A respectively (again, see the image below for the letters). It also works: I measure 3.3V between B and A.
- Connect the motor +/- to the numbers 3 and 4 respectively.
- Connect the Raspberry Pi PINs 36 and 38 (i.e. GPIO 16 and GPIO 20) to the letters E and F respectively. 



On the website where I bought the board and on several other websites, it was explicitly written that the "input level" could be 3.3-5V, while some other websites only read 5V.

As the RPi GPIO PINs can deliver only 3.3V, I decided to use 3.3V. It didn't work. As a commenter on my OP emphasized on the fact that it needed 5V to work, I decided to try it out. Guess what!? It worked.
