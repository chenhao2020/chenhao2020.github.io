---
title: '电机驱动器及python程序：Big-Rob机器人小车项目'
date: 2019-12-20 11:50:33
tags: 机器人小车
categories: 
- 内在提升
- 技能爱好
- 第二技能
---


首先，Big-Rob我尝试了一个2.5A的小型**H桥**为直流电机供电。但是这种类型的电机驱动器太小，电动机驱动器烧坏了。随后，为Big Rob买了**升级版**，现在我能够开车转弯并在不烧毁电动机驱动器的情况下当场转弯。我用了每个输出超过10A的电机驱动器。我发现了一个**总电流为43A的电动机驱动器**，它可以由Raspberry Pi控制。我决定购买两个**BTS7960B电机驱动器**，因为它们能够提供总共43 A的电流，这足以满足我的四个直流电机的需求。

下图显示了两个电机驱动器和Raspberry Pi的接线，并置于Big Rob内的纸板上。

![](https://i.loli.net/2019/12/20/ozfSnGljA1JhWL4.jpg)

### 连接BTS7960B电机驱动器

您需要六根**母对母跳线**才能将电机驱动器与Raspberry Pi连接。两条跳线为电机驱动器提供3.3V电压（VCC和GND）。另外两根线来激活每个H桥，并通过Raspberry Pi产生的高信号来设置直流电动机的旋转方向（R_EN / L_EN）。最后两根母对母跳线为PWM信号提供给电动机驱动器，以控制直流电动机（RPWM / LPWM）的速度。

![](https://i.loli.net/2019/12/20/SetYUVT4NywEkxW.jpg)

### BTS7960B PYTHON的程序：

您必须重新编写我已经开发的控制L298N H桥的Python程序，来控制BTS7960B电机驱动器。Python控制程序很容易将新的BTS7960B Python程序作为模块导入，并且无需更改控制程序中的任何内容即可控制电动机驱动器。
<!-- more -->
我上传了带有一些内联文档的Python程序，该文档描述了使用哪些GPIO引脚。这对于接线电机驱动器很重要。

下载：[Big Rob电动机控制器程序L298NHBigrob.py](https://custom-build-robots.com/wp-content/uploads/2017/01/L298NHBigrob.py_.zip)

```python
#!/usr/bin/env python
# coding: latin-1
# Autor:   Ingmar Stapel
# Datum:   20160731
# Version:   2.0
# Homepage:   http://custom-build-robots.com

# Dieses Programm wurde fuer die Ansteuerung der linken und rechten
# Motoren des Roboter-Autos entwickelt. Es geht dabei davon aus,
# dass eine L298N H-Bruecke als Motortreiber eingesetzt wird.

# Dieses Programm muss von einem uebergeordneten Programm aufgerufen 
# werden, dass die Steuerung des Programmes L298NHBridge übernimmt.

# Es wird die Klasse RPi.GPIO importiert, die die Ansteuerung
# der GPIO Pins des Raspberry Pi ermoeglicht.
import RPi.GPIO as io
io.setmode(io.BCM)

# Die Variable PWM_MAX gibt die maximale Drehgeschwindigkeit der 
# Motoren als Prozentwert vor.
# Die Geschwindigkeit wird initial auf 70% der max Leistung der
# H-Bruecke gedrosselt um am Anfang mit der Steuerung des Roboter
# Autos besser zurecht zu kommen. Soll das Roboter-Auto schneller 
# fahren kann hier der Wert von 70% auf maximal 100% gesetzt werden.

PWM_MAX = 100

# Mit dem folgenden Aufruf werden eventuelle Warnungen die die 
# Klasse RPi.GPIO ausgibt deaktiviert.
io.setwarnings(False)

# Im folgenden Programmabschnitt wird die logische Verkabelung des 
# Raspberry Pi im Programm abgebildet. Dazu werden den vom Motor 
# Treiber bekannten Pins die GPIO Adressen zugewiesen.

# --- START KONFIGURATION GPIO Adressen ---

# Linker Motortreiber
L_L_EN = 22 # leftmotor_in1_pin
L_R_EN = 23 # leftmotor_in2_pin
L_L_PWM = 18 # leftmotorpwm_pin_l
L_R_PWM = 17 # leftmotorpwm_pin_r

# Rechter Motortreiber
R_L_EN = 13 # rightmotor_in1_pin
R_R_EN = 19 # rightmotor_in2_pin
R_L_PWM = 12 # rightmotorpwm_pin_l
R_R_PWM = 6 # rightmotorpwm_pin_r


# --- ENDE KONFIGURATION GPIO Adressen ---

# Der Variable leftmotor_in1_pin wird die Varibale IN1 zugeorndet. 
# Der Variable leftmotor_in2_pin wird die Varibale IN2 zugeorndet. 
leftmotor_in1_pin = L_L_EN
leftmotor_in2_pin = L_R_EN
# Beide Variablen leftmotor_in1_pin und leftmotor_in2_pin werden als
# Ausgaenge "OUT" definiert. Mit den beiden Variablen wird die
# Drehrichtung der Motoren gesteuert.
io.setup(leftmotor_in1_pin, io.OUT)
io.setup(leftmotor_in2_pin, io.OUT)

# Der Variable rightmotor_in1_pin wird die Varibale IN1 zugeorndet. 
# Der Variable rightmotor_in2_pin wird die Varibale IN2 zugeorndet. 
rightmotor_in1_pin = R_L_EN
rightmotor_in2_pin = R_R_EN
# Beide Variablen rightmotor_in1_pin und rightmotor_in2_pin werden 
# als Ausgaenge "OUT" definiert. Mit den beiden Variablen wird die
# Drehrichtung der Motoren gesteuert.
io.setup(rightmotor_in1_pin, io.OUT)
io.setup(rightmotor_in2_pin, io.OUT)

# Die GPIO Pins des Raspberry Pi werden initial auf False gesetzt.
# So ist sichger gestellt, dass kein HIGH Signal anliegt und der 
# Motor Treiber nicht unbeabsichtigt aktiviert wird.
io.output(leftmotor_in1_pin, True)
io.output(leftmotor_in2_pin, True)
io.output(rightmotor_in1_pin, True)
io.output(rightmotor_in2_pin, True)

# Der Variable leftmotorpwm_pin wird die Varibale ENA zugeorndet.
# Der Variable rightmotorpwm_pin wird die Varibale ENB zugeorndet.
leftmotorpwm_pin_l = L_L_PWM 
leftmotorpwm_pin_r = L_R_PWM

rightmotorpwm_pin_l = R_L_PWM
rightmotorpwm_pin_r = R_R_PWM

# Die Beide Variablen leftmotorpwm_pin und rightmotorpwm_pin werden 
# als Ausgaenge "OUT" definiert. Mit den beiden Variablen wird die
# Drehgeschwindigkeit der Motoren über ein PWM Signal gesteuert.
io.setup(leftmotorpwm_pin_l, io.OUT)
io.setup(leftmotorpwm_pin_r, io.OUT)

io.setup(rightmotorpwm_pin_l, io.OUT)
io.setup(rightmotorpwm_pin_r, io.OUT)

# Die Beide Variablen leftmotorpwm_pin und rightmotorpwm_pin werden 
# zusätzlich zu Ihrer Eigenschaft als Ausgaenge als "PWM" Ausgaenge
# definiert.
leftmotorpwm_l = io.PWM(leftmotorpwm_pin_l,100)
leftmotorpwm_r = io.PWM(leftmotorpwm_pin_r,100)

rightmotorpwm_l = io.PWM(rightmotorpwm_pin_l,100)
rightmotorpwm_r = io.PWM(rightmotorpwm_pin_r,100)

# Die linke Motoren steht still, da das PWM Signale mit 
# ChangeDutyCycle(0) auf 0 gesetzt wurde.
leftmotorpwm_l.start(0)
leftmotorpwm_r.start(0)

leftmotorpwm_l.ChangeDutyCycle(0)
leftmotorpwm_r.ChangeDutyCycle(0)

# Die rechten Motoren steht still, da das PWM Signale mit 
# ChangeDutyCycle(0) auf 0 gesetzt wurde.
rightmotorpwm_l.start(0)
rightmotorpwm_r.start(0)

rightmotorpwm_l.ChangeDutyCycle(0)
rightmotorpwm_r.ChangeDutyCycle(0)

# Die Funktion setMotorMode(motor, mode) legt die Drehrichtung der 
# Motoren fest. Die Funktion verfügt über zwei Eingabevariablen.
# motor      -> diese Variable legt fest ob der linke oder rechte 
#              Motor ausgewaehlt wird.
# mode      -> diese Variable legt fest welcher Modus gewaehlt ist
# Beispiel:
# setMotorMode(leftmotor, forward)   Der linke Motor ist gewaehlt
#                                   und dreht vorwaerts .
# setMotorMode(rightmotor, reverse)   Der rechte Motor ist ausgewaehlt 
#                                   und dreht rueckwaerts.
# setMotorMode(rightmotor, stopp)   Der rechte Motor ist ausgewaehlt
#                                   der gestoppt wird.

def setMotorMode(motor, mode):
   if motor == "leftmotor":
      if mode == "reverse":
         io.output(leftmotor_in1_pin, True)
         io.output(leftmotor_in2_pin, False)
      elif  mode == "forward":
         io.output(leftmotor_in1_pin, False)
         io.output(leftmotor_in2_pin, True)
      else:
         io.output(leftmotor_in1_pin, False)
         io.output(leftmotor_in2_pin, False)
   elif motor == "rightmotor":
      if mode == "reverse":
         io.output(rightmotor_in1_pin, False)
         io.output(rightmotor_in2_pin, True)      
      elif  mode == "forward":
         io.output(rightmotor_in1_pin, True)
         io.output(rightmotor_in2_pin, False)
      else:
         io.output(rightmotor_in1_pin, False)
         io.output(rightmotor_in2_pin, False)
   else:
      io.output(leftmotor_in1_pin, False)
      io.output(leftmotor_in2_pin, False)
      io.output(rightmotor_in1_pin, False)
      io.output(rightmotor_in2_pin, False)

# Die Funktion setMotorLeft(power) setzt die Geschwindigkeit der 
# linken Motoren. Die Geschwindigkeit wird als Wert zwischen -1
# und 1 uebergeben. Bei einem negativen Wert sollen sich die Motoren 
# rueckwaerts drehen ansonsten vorwaerts. 
# Anschliessend werden aus den uebergebenen Werten die notwendigen 
# %-Werte fuer das PWM Signal berechnet.

# Beispiel:
# Die Geschwindigkeit kann mit +1 (max) und -1 (min) gesetzt werden.
# Das Beispielt erklaert wie die Geschwindigkeit berechnet wird.
# SetMotorLeft(0)     -> der linke Motor dreht mit 0% ist gestoppt
# SetMotorLeft(0.75)  -> der linke Motor dreht mit 75% vorwaerts
# SetMotorLeft(-0.5)  -> der linke Motor dreht mit 50% rueckwaerts
# SetMotorLeft(1)     -> der linke Motor dreht mit 100% vorwaerts
def setMotorLeft(power):
   int(power)
   if power < 0:
      # Rueckwaertsmodus fuer den linken Motor
      #setMotorMode("leftmotor", "reverse")
      pwm = -int(PWM_MAX * power)
      if pwm > PWM_MAX:
         pwm = PWM_MAX
      leftmotorpwm_l.ChangeDutyCycle(pwm)
      leftmotorpwm_r.ChangeDutyCycle(0)      
   elif power > 0:
      # Vorwaertsmodus fuer den linken Motor
      #setMotorMode("leftmotor", "forward")
      pwm = int(PWM_MAX * power)
      if pwm > PWM_MAX:
         pwm = PWM_MAX
      leftmotorpwm_l.ChangeDutyCycle(0)
      leftmotorpwm_r.ChangeDutyCycle(pwm)
   else:
      # Stoppmodus fuer den linken Motor
      leftmotorpwm_l.ChangeDutyCycle(0)
      leftmotorpwm_r.ChangeDutyCycle(0)
      
# Die Funktion setMotorRight(power) setzt die Geschwindigkeit der 
# rechten Motoren. Die Geschwindigkeit wird als Wert zwischen -1 
# und 1 uebergeben. Bei einem negativen Wert sollen sich die Motoren 
# rueckwaerts drehen ansonsten vorwaerts. 
# Anschliessend werden aus den uebergebenen Werten die notwendigen 
# %-Werte fuer das PWM Signal berechnet.

# Beispiel:
# Die Geschwindigkeit kann mit +1 (max) und -1 (min) gesetzt werden.
# Das Beispielt erklaert wie die Geschwindigkeit berechnet wird.
# setMotorRight(0)     -> der linke Motor dreht mit 0% ist gestoppt
# setMotorRight(0.75)  -> der linke Motor dreht mit 75% vorwaerts
# setMotorRight(-0.5)  -> der linke Motor dreht mit 50% rueckwaerts
# setMotorRight(1)     -> der linke Motor dreht mit 100% vorwaerts   
   
def setMotorRight(power):
   int(power)
   if power < 0:
      # Rueckwaertsmodus fuer den rechten Motor
      #setMotorMode("rightmotor", "reverse")
      pwm = -int(PWM_MAX * power)
      if pwm > PWM_MAX:
         pwm = PWM_MAX
      rightmotorpwm_l.ChangeDutyCycle(pwm)
      rightmotorpwm_r.ChangeDutyCycle(0)
   elif power > 0:
      # Vorwaertsmodus fuer den rechten Motor
      #setMotorMode("rightmotor", "forward")
      pwm = int(PWM_MAX * power)
      if pwm > PWM_MAX:
         pwm = PWM_MAX
      rightmotorpwm_l.ChangeDutyCycle(0)
      rightmotorpwm_r.ChangeDutyCycle(pwm)
   else:
      # Stoppmodus fuer den rechten Motor
      rightmotorpwm_l.ChangeDutyCycle(0)
      rightmotorpwm_r.ChangeDutyCycle(0)
   
# Die Funktion exit() setzt die Ausgaenge die den Motor Treiber 
# steuern auf False. So befindet sich der Motor Treiber nach dem 
# Aufruf derFunktion in einem gesicherten Zustand und die Motoren 
# sind gestopped.
def exit():
   io.output(leftmotor_in1_pin, False)
   io.output(leftmotor_in2_pin, False)
   io.output(rightmotor_in1_pin, False)
   io.output(rightmotor_in2_pin, False)
   io.cleanup()
   
# Ende des Programmes

```


### 适用于PCA9685伺服控制器的BTS7960B PYTHON程序

为了控制BigRob机器人，我安装了两个BTS7960B电机驱动器。这些电动机驱动器需要四个PWM信号来设置直流电动机的速度。Raspberry Pi在生成精确的PWM信号方面非常糟糕。这是他的体系结构问题，无法轻松解决。我的BigRob的最新程序版本使用PCA9685伺服控制器来生成精确的PWM信号。现在，仅将连接到Raspberry Pi的PWM引脚连接到伺服控制器。用于启用BTS7960B电机驱动器的引脚仍连接到Raspberry Pi。

该程序的最新版本可在GitHub上找到：[Motor-Driver-BTS7960B-and-PCA9685](https://github.com/custom-build-robots/Motor-Driver-BTS7960B-and-PCA9685)

![](https://i.loli.net/2019/12/20/4umf3rdQBOzUt9s.jpg)

BTS7960B的接线非常困难。重复使用我已经开发的Python程序会节省了很多时间，几分钟后，您就可以使用Big Rob和新的电机驱动器进行驱动了。拥有一个强大的驱动非常酷。