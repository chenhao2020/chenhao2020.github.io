---
title: GPS MODULE 软件安装
date: 2019-12-20 17:38:07
tags: 机器人小车
categories: 
- 内在提升
- 技能爱好
- 第二技能
---

本章介绍了如何在Raspbian中安装RasPiGNSS Aldebaran模块的软件，该模块硬件现在安装在Raspberry Pi上方。我将使用Raspbian作为操作系统。Raspbian版本是2016-09-23-raspbian-jessie.img。

![RasPiGNSS模块-软件设置](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/N3njmTzj2M.jpg)

#### RASPIGNSS软件安装

对于基站，我使用Raspberry Pi 1 ModelB。RaspberryPi 1 Model B具有足够的CPU能力，可以用作基站。基站仅需接收GPS信号并将GPS信号的原始流或RTCM3流发送到机器人小车的移动单元。移动单元需要更多的CPU能力来计算精确的GPS位置。这就是为什么移动站配备Raspberry Pi 2 Model B的原因，它具有比Raspberry Pi 1 Model B更大的CPU能力。
<!-- more -->
#### 在MICRO SD卡上安装RASPBIAN：

首先，需要在micro-SD卡上安装Raspbian的最新版本，可从Raspberry Pi官方主页上获得。

我决定使用完整版的Raspbian。但是我不使用图形界面启动Raspbian。将来或许需要图形界面。

在micro-SD卡上安装Raspbian之后，应更新Raspbian支持包。

要更新Raspbian，请登录并先扩展文件系统，以获取可用的Micro SD卡的全部空间（扩展文件系统）。要扩展文件系统，请通过终端窗口启动配置工具。启动配置工具的命令如下。

```bash
sudo raspi-config
```
完成此步骤后，请重新启动Raspberry Pi，以使更改生效并完全访问您的micro-SD卡可用空间。

现在是时候更新和升级Raspbian安装了。这两个步骤将花费几分钟。请执行以下命令。

```bash
sudo apt-get #更新
sudo apt-get #升级
```
有时会为您的Raspberry Pi提供新的固件版本。要更新固件，请在终端窗口中执行以下两个命令。

```bash
sudo apt-get install
sudo rpi-update
````

如果成功执行了所有命令，Raspbian安装将被更新，并且所有软件包的最新版本都将被安装。

#### RASPIGNSS模块设置：

对于RasPiGNSS模块的安装，我使用了来自www.drfasching.at的安装指南。需要打开终端窗口，您可以将Raspberry Pi插入显示器或通过PuTTY / SSH远程连接到Raspberry Pi。下一步适用于基站和移动单元。

**1. UART接口速度**

您必须检查UART接口的时钟速率是否设置为6 MHZ。要检查此设置，请使用Nano打开/boot/config.txt文件。使用以下命令，您可以启动Nano并打开config.txt文件。

```bash
sudo nano /boot/config.txt
```
现在，在文件config.txt中搜索init_uart_clock = 6000000。如果找不到该行，请在config.txt文件末尾添加该行。如果更改了文件，请保存更改并重新启动Raspberry Pi。

```bash
sudo reboot
```
要在BINR模式下使用RasPiGNSS模块，必须进行此更改。该模块在UART接口上需要230400 波特 (baud)的波特率。

**2. / dev / ttyAMA0的用法**

现在，您必须检查Raspberry Pi是否未使用串行端口`/dev/ttyAMA0`。您必须检查文件`/boot/cmdline.txt`和`/etc/inittab`中的设置：

`/boot/cmdline.txt`
`/etc/inittab`（此文件在我使用的Raspbian版本中不可用）
在两个文件中搜索以下条目。如果看到该条目，请删除该条目并保存更改。

```
console=ttyAMA0,115200
console=serial0,115200
```
**3. 文件/ ect / inittab丢失**

如果从Raspbian安装时缺少`/ect/inittab`文件，则必须执行以下两个命令。使用这两个命令，可以启动访问`/dev/ttyAMA0`设备的getty进程。

```bash
sudo systemctl stop serial-getty@ttyAMA0.service
sudo systemctl disable serial-getty@ttyAMA0.service
```
**4. Raspberry Pi 3 Model B的特征**

Raspberry Pi 3 Model B是第一款具有WIFI和蓝牙模块的Raspberry Pi。该模块默认使用UART接口。但是RasPiGNSS模块需要此UART接口进行通信。要停用Raspberry Pi 3 Model B对UART接口的使用，必须在/boot/config.txt文件中进行以下更改。

```
dtoverlay=pi3-miniuart-bt
enable_urt=1
```

**5. 安装用于Raspberry Pi的BCM2835库**

现在，将DEBIAN软件包与BCM2835库一起安装，该库也可以从以下网站www.drfasching.at下载。

链接如下：[bcm2835](http://drfasching.com/downloads#rpgtools) 。

现在，使用以下命令在Raspberry Pi上安装下载的BCM2835库。

```bash
sudo dpkg -i <程序包名称.deb>

# 注意有关BCM2835库的源代码：

# 网站：airspayce.com
# 作者：Mike McCauley
# 许可证：GPLv2

```
**6. 为Raspberry Pi安装Perl BCM2835绑定**

现在，您必须安装Perl绑定。Perb与libbcm2835绑定，以从Perl访问Broadcom BCM2835芯片。

现在，使用以下命令在Raspberry Pi上安装下载的BCM2835库" libdevice-bcm2835-perl_1.9_armhf.deb"。实际版本可能与此处发布的文件名不同。

```bash
sudo dpkg -i <程序包名称.deb>
#关于Perl BCM2835库的源的注释：

# 网站：cpan.org
# 作者：Mike McCauley
# 许可证：Perl艺术许可证
# 注意：这是Debian Jessie版本（用于Perl 5.20.2）
```
7.安装lrzsz程序

接下来，您必须安装lrzsz程序。Lrzsz是经过修饰的`zmodem / ymodem/xmodem`软件包，它是由Chuck Forsberg的rzsz软件包的公共领域版本构建的。这些程序使用纠错协议（{z，x，y} modem）通过拨入串行端口从各种程序下运行的各种程序发送（sz，sx，sb）和接收（rz，rx，rb）文件操作系统（来源：https://packages.debian.org/en/sid/lrzsz）。

命令：   `sudo apt-get install lrzsz`

8.安装RPGTOOLS

下一步安装RasPiGNSS工具。rpgtools工具链接如下：
http://drfasching.com/downloads#rpgtools

请从网站以DEBIAN软件包的形式下载最新的rpgtools，并将文件保存在Raspberry Pi主目录中。我将rpgtools保存在以下目录`/home/pi/raspignss/`中。

使用以下命令将rpgtools安装在Raspbian为操作系统的Raspberry Pi上。

```bash
sudo dpkg -i <程序包名称.deb>
```
所有已安装的rpgtools文件都存储在目录`/usr/bin/`下。

**9. 安装用于Raspberry Pi的RTKLIB CUI工具**

现在安装RTKLIB CUI工具的DEBAIN软件包，可从链接[rtklib](http://drfasching.com/downloads#rpgtools)下载，该软件包可从网站 www.drfasching.at 上获得。

现在，使用以下命令安装下载的RTKLIB CUI工具。

```bash
sudo dpkg -i <程序包名称.deb>
#请注意有关RTK库的源代码：
# 网站rtklib.com
# 作者：高须友二
# 许可证：BSD 2-clause
```
现在已经安装了所有软件，以使RasPiGNSS模块与Raspberry Pi一起运行。

#### RASPIGNSS模块的测试：
使用以下命令，您可以测试RasPiGNSS模块是否正常运行。执行这两个命令后，您应该在终端窗口中看到收到的GPS坐标。

```bash
nvsmode nmea
nmeaparse
```

程序nvsmode以及RPGTOOLS中的所有其他程序都存储在文件夹`/usr/bin`下。

**发生错误时请注意**

如果收到以下错误消息

`Can't locate Device::BCM2835.pm in @INC`

则必须处理以下安装例程才能在Raspberry Pi上安装Device :: BCM2835

```bash
sudo cpan -i Device::BCM2835
```
如果一切正常，执行nvsmode nmea命令后在终端窗口中可以看到如下输出。

![RasPiGNSS模块-nmeaparse](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/G6EekYP63P.jpg)

#### 常见问题解答

www.drfasching.at网站的 [FAQ]非常有帮助。

#### 总结

RasPiGNNS模块和软件的安装过程非常顺利。接收到的GPS坐标的第一个结果通过小程序nmeaparse显示在终端窗口中。现在，我必须研究基站的设置和RTK库的配置。在使用RTK库设置了基站和移动单元之后，我将构建下一个机器人，该机器人将使用这些设置进行导航。首先，我将克隆SD卡并保存镜像。此镜像是基站和移动单元配置的起点。