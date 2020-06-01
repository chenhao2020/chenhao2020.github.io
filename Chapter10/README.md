---
title: GPS MODULE 基站配置
date: 2019-12-20 17:38:07
tags: 机器人小车
categories: 
- 内在提升
- 技能爱好
- 第二技能
---

在上一篇文章中，介绍了如何安装RasPiGNSS模块的软件。安装软件后，需要进行检查，以确保Raspberry Pi和RasPiGNSS GPS接收器总体正常运行。

本文介绍了如何配置基站，用于差分GPS定位。基站无论晴天和雨天都在户外运行。这就是为什么必须保护所有电子设备不受恶劣天气影响的原因。使用防水盒很重要。我自己制作一个防水盒。

#### 防水盒

我买了一个午餐盒作为基站盒。午餐盒非常便宜，仅售4,99欧元，并且足够大，可以在盒中存储Raspberry Pi，降压转换器，RasPiGNSS GPS接收器，移动电源和XBee Pro无线电模块。对于外部WIFI天线和GPS天线的连接器，我在包装盒中钻了两个孔并拧紧了连接器。我将Tallysman&trade;TW-2410 GPS天线的电缆通过电缆固定头插入，该电缆固定头的尺寸为M16，是标准IP68防水电缆固定头。电源电缆也从外部通过带有IP68等级的M12的电缆接头插入包装盒中的Raspberry Pi和RasPiGNSS模块的。下图显示了包装盒。包装盒左侧和右侧分别带有两个天线和两个电缆固定头。

![RasPiGNSS-户外箱](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/DFeffGcjfd.jpg)

#### 基站配置

如前文所述，已经安装了基站需要运行的所有软件。唯一需要配置的就是str2str服务,该服务将通过WIFI或XBee无线电模块接收到的GPS信号流进行转化。我将str2str服务用于这项工作，它已经是RTK库的一部分。

从www.drfasching.at下载名称为"rtkbase"的"rtkbase"脚本，该脚本是RPGTOOLS的一部分。该脚本是str2str服务的预配置文件，应该可以立即使用。该脚本通过TCP/IP或与XBee模块的串行连接来配置GPS数据传输。

下载RTKBASE脚本：[downloads](http://drfasching.com/downloads.html#rpgtools)

安装RPGTOOLS之后，该脚本将安装在文件夹/ usr / bin /中。
<!-- more -->
#### RC.LOCAL配置

必须将基站的RasPiGNSS模块设置为BINR模式才能接收原始GPS数据。要将RasPiGNSS模块设置为BINR模式以接收原始GPS数据，必须在每次重新启动Raspberry Pi后执行下面的命令。

每次重新启动Raspberry Pi后，都将命令配置。每次重新启动后，必须配置RasPiGNSS模块，因为它没有内存来存储配置。重新启动后，它将始终处于默认的NMEA模式。

我在/etc/rc.local文件中将以root用户配置。此命令将RasPiGNSS模块设置为基站所需的操作模式，并从str2str服务的最后一条命令开始。要以root用户身份编辑rc.local，必须执行以下命令。

命令： `sudo nano /etc/rc.local`

请在rc.local的末尾添加以下命令并保存更改。

```bash
(/bin/sleep 5 && /usr/bin/nvsctl -v reset)

(/bin/sleep 7 && /usr/bin/nvsmode -v binr)

(/bin/sleep 9 && /usr/bin/binrcmd -v /home/pi/gnss/rpgtools/etc/init.cmd)

(/bin/sleep 11 && /usr/bin/rtkbase &)
```

如下图所示。保存更改后，请重新启动Raspberry Pi。

![RasPiGNSS rc-local](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/tEG5tFkPYj.png)

检查RasPiGNSS模块现在是否以BINR模式工作，请执行以下命令并检查模块的通信速度。

命令： `stty -aF /dev/ttyAMA0`

如下图所示，波特率是" 230400"，适用于BINR模式。现在我们知道该模块正在BINR模式下工作，NMEA模式的波特率较低，为"115200"。

![RasPiGNSS模块-BINR模式](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/2jeWCR5dwA.jpg)

#### 手动启动基站

使用以下命令，您可以启动基站。如果您如上所述更改了rc.local，则每次重新启动Raspberry Pi后，str2str服务器将自动启动。

命令： `sudo ./usr/bin/rtkbase`

如果您手动启动rtkbase脚本，则该脚本的输出应类似于下图。如果将其他设备连接到str2str服务并读取GPS数据流，则将看到IP地址。如果有多个设备正在读取GPS流，则只会看到一个计数，而不是所有IP地址。

![Basisstation终端-Skript rtkbase.txt](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/aPAh5THpbJ.jpg)


#### RTKBASE GPS原始数据流

如果使用str2str服务通过TCP/IP流将原始GPS数据发送到移动单元，则必须更改rtkbase脚本的配置。您可以在以下文件夹`/usr/bin/rtkbase`中找到该脚本。您唯一需要做的就是让outformat以及messages配置空白，如下所示。

```bash
outformat=
messages=
```

rtkbase脚本现在应如下图所示。在该outformat 和messages均为空白。

![rtkbase配置原始数据流](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/4Z6fwFdEaw.jpg)


通过这两次更改，GPS原始数据将被发送到移动单元。根据所用无线电连接的带宽，原始数据流可能太大，您必须切换到使用较小带宽的RTCM3流。

#### RTKBASE GPS RTCM3流

如果要通过TCP/IP使用str2str服务将RTCM3 GPS数据流发送到移动单元，则必须更改rtkbase脚本的配置。您可以在以下文件夹`/usr/bin/rtkbase`中找到该脚本。您唯一要做的就是设置要发送的`outformat ="RTCM3"` `messages=" 1002,1004"` 等"，如下所示。

outformat="rtcm3"
messages="1002,1004,1006,1010,1013,1019,1020,1033,1107″
```

![rtkbase配置RTCM3数据流](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/askWMArwaz.jpg)

#### RTKBASE TCP/IP或XBee模块串行传输

如果要通过TCP/IP发送GPS数据或通过XBee模块串行发送GPS数据，则必须在rtkbase脚本中配置传输类型。

**TCP/IP配置**
如果来自基站的GPS数据必须通过WIFI作为RTCM3流在本地网络中进行流传输，则
`/usr/bin/rtkbase`配置文件必须进行如下更改。下一个显示了rtkbase的完整配置。

```bash
outtype="tcpsvr"
outstream=":5800"
outformat="rtcm3"
messages="1002,1004,1006,1010,1013,1019,1020,1033,1107"
```

用于设置TCP / IP流的配置如下图所示。

![rtkbase配置tcp ip流](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/KtZefZ7MJF.jpg)

#### 串行XBee配置

如果必须将来自基站的GPS数据作为RTCM3流通过XBee模块进行流处理，则必须按以下方式更改`/usr/bin/rtkbase`配置文件。下图显示了rtkbase的完整配置，通过串行XBee将GPS数据作为RTCM3流传输。

```bash
outtype="serial"
outstream="ttyUSB0:115200:8:n:1:off"
outformat="tcm3"
messages="1002,1004,1006,1010,1013,1019,1020,1033,1107"
```

仅用于串行XBee流设置的配置如下图所示。

rtkbase配置串行xbee流
![rtkbase配置串行xbee流](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/s288WjxFQY.jpg)

#### RTKBASE GPS坐标配置

您应该在`/usr/bin/rtkbase`中配置GPS坐标以及海拔高度  。该配置对于移动单元计算相对于基站的相对位置很重要。配置应如下图所示。

![Konfiguration – rtkbase](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/iW6xbw2Wht.png)

#### GPS数据流–基站

例如，您可以通过移动单元<IP地址>：<5800>查看从基站接收的作为RTCM3流的GPS数据流。

使用平板电脑上的应用RTK + GPS，您可以接收GPS流并在类似google maps的地图上显示位置。

![屏幕截图-RTK加GPS](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/tNJwRDpcis.jpg)

您也可以在PC上安装RTKNAVI程序，并查看从基站接收到的GPS数据流。

Windows版RTKNAVI
![Windows版RTKNAVI](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191224/R4Bjh6TkCQ.jpg)

可通过以下ULR获得适用于Windows的RTKNAVI程序：[GitHub中的Open Repository](https://github.com/tomojitakasu/RTKLIB_bin)。

#### 总结

在使用RTL库并熟悉库的配置之后，很容易设置基站和操作基站。为Raspberry Pi和所有其他电子组件找到便宜又防水的外壳并不容易。我使用了一个非常便宜的午餐盒，并且很容易在饭盒上为电缆打孔。要安装和配置RTKLIB，我需要一天的时间。str2str服务器的配置非常复杂，但是我希望我的解释很容易理解。基站的设置工作良好且可靠，现在我可以设置移动单元，流动站和XBee连接了。