---
title: GPS MODULE RASPIGNSS项目一移动单元配置
date: 2019-12-20 17:38:07
tags: 机器人小车
categories: 
- 内在提升
- 技能爱好
- 第二技能
---

上一篇文章介绍了如何设置基站以及基站如何发送GPS数据。现在是时候设置作为机器车一部分的移动单元了。基站和移动单元之间的主要区别在于，移动单元从基本单元接收GPS数据。结合GPS数据，移动单元可以通过RTK库计算出非常精确的位置。移动单元的设置非常简单。首先，您必须从基站创建镜像。将镜像复制到移动设备的新Micro SD卡上。该复制的镜像是移动单元配置的起点。

就像我在基站上所做的那样，将移动单元也放置在便当盒中。该便当盒将被放入机器车中。便当盒的塑料非常容易加工，并且可以在便当盒中钻孔而不产生裂纹。下图显示了移动单元和基站。对于这两个单单元我使用的是RasPiGNSS GPS模块（www.drfasching.at）。

![](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191225/F66mryt5Xk.jpg)

现在启动移动单元。首先，您必须将主机名（ host nam）从" bstation" 更改为" mstation"。一切都安装好了。现在我们可以开始移动单元的配置了。
<!-- more -->
我们将为移动单元使用第二个GPS天线（ Tallysman&trade;TW-4421）。移动单元还将获得XBee Pro模块S1，就像基站用于两个单元的通信一样。GPS原始数据将通过XBee模块进行传输。但首先，我们将使用WIFI连接进行通信。

下图显示了两个站的设置。

![](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191225/MpMRpxCcZQ.jpg)

移动单元操作的前提是，移动单元从基站接收GPS数据流。正如我在 " 理论设置 " 一文中解释的那样，两个单元都需要无线电连接才能相互通信。如" 基站 "一文中所述，配置是在文件" /usr/bin/rtkbase " 中完成的  ，各单元之间通信。

#### 移动单元–软件设置

本章介绍如何配置GPS接收器和RTKRCV（实时定位程序）以及如何在移动设备上运行该程序。

#### RASPIGNSS MODUL初始化

在将RasPiGNSS模块与RTL库一起使用之前，您必须以BINR模式初始化该模块。要做到这一点，请找到的文件夹 "/usr/etc/"下的脚本，这是RPGTOOLS的一部分。安全初始化的最佳方法是，每次重新启动后都将运行脚本，就像我们在基站上一样。我在rc.local配置中再次进行了以BINR模式启动模块的配置。

要编辑/ect/rc.local进行配置，请使用以下命令。

命令： ```sudo nano /etc/rc.local```

请在rc.local配置文件的末尾添加以下行并保存更改。

```bash
(/bin/sleep 5 && /usr/bin/nvsctl -v reset)

(/bin/sleep 7 && /usr/bin/nvsmode -v binr)

(/bin/sleep 9 && /usr/bin/binrcmd -v /home/pi/gnss/rpgtools/etc/init.cmd)

(/bin/sleep 11 && /usr/bin/rtkrcv -s -p 23 -m 24 -o /home/pi/gnss/rtkrover.conf &)

```

进行此更改后，RasPiGNSS模块应是以正确的模式启动。

最后一行 

`/ usr / bin / rtkrcv -s -p 23 -m 24 -o /home/pi/gnss/rtkrover.conf`

启动程序rtkrcv，用于计算移动单元RTK位置。您可以使用RTKRCV程序（<IP地址> <端口>）从任何计算telnet连接。

#### 注意：TELNET客户端

如果您想关闭rtkrcv telnet连接，请在telnet窗口/ telnet客户端中输入" exit "。如果您没有键入exit且关闭窗口，则将无法重新连接。只有重新启动程序rtkrcv后，您才能通过telnet重新连接。

你可以在www.drfasching.at 中阅读更多关于RasPiGNSS GPS模块的初始化的文章。

#### 注意：检查BINR模式

必须在移动站和基站上以BINR模式配置RasPiGNSS模块。要将模块设置为BINR模式，可以使用上述命令。可以使用以下命令检查模块是否以BINR模式运行。

命令：` stty -aF/dev/ttyAMA0 `

下图显示了在我的基站上使用命令的输出，波特率为230400 bps显示。此速率，可以确定模块以BINR模式运行，而不是以NMEA模式（波特率为115200）运行。

![RasPiGNSS模块-BINR模式](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191225/pSadBTBhAG.jpg)


在BINR模式下初始化GPS模块后，您现在可以使用RTKRCV程序来计算移动设备的精确的GPS位置。

#### RTKRCV程序–简短介绍

您将在移动单元上运行RTKRCV（实时定位程序）程序。该程序需要一个配置文件。我为配置文件使用的名称为rtkrover.conf。该文件描述了rtkrcv程序应如何进行定位计算。在此文件中，配置了两个GPS输入流。基站将一个流发送到移动单元，而另一个流则由移动单元本身的RasPiGNSS模块生成。

rtkrcv.conf或rtkrover.conf配置文件配置了如何计算实时定位的知识。您不仅需要此文件来开始计算，还需要此配置文件来以最佳方式配置和优化位置计算。

#### RTKRCV程序的其他选项

您可以使用以下参数来启动RTKRCV程序：

| 值 | 描述 |
| :------ | :------ | 
| -s | start RTK server on program startup | 
| -p port | port number for telnet console | 
|-m port|port number for monitor stream|
|-d dev|terminal device for console|
|-o file|configuration file|
|-r level|output solution status file (0:off,1:states,2:residuals)|
|-t level|debug trace level (0:off,1-5:on)|

更多详情，请查阅：[RTKLIB](http://www.rtklib.com/prog/manual_2.4.2.pdf)

#### RTKRCV程序手动启动

如果您手动启动了rtkrcv程序，则您现在位于程序的终端中。要使用和控制程序，可以使用一些命令。要显示所有可用命令的列表，只需在终端中键入" h"。窗口中将显示所有命令列表的简短帮助。通过telnet连接时，也可以使用所有这些命令。

#### RTKRCV程序自动启动

在启动程序后，第一个使用的参数-s将自动启动RTKRCV服务。在每次重新启动Raspberry Pi之后通过脚本启动程序时，此参数非常重要。我已经在上一章中解释了这一点，在该章中，我描述了如何配置rc.local。

使用第二个参数–p，将启动终端，该终端可通过telnet（telnet <IP地址>：2950）在端口2950上使用。这样一来，您无需坐在移动单元前就可以通过Telent控制rtkrcv程序。

我总是使用命令" -o /home/pi/gnss/rtkrover.conf"来加载配置文件rtkrover.conf。文件位于" /home/pi/gnss/rtkrover.conf "。使用–o参数，将在RTKRCV程序的启动过程中自动加载所有配置。

命令： `
sudo /usr/bin/rtkrcv -s -p 23 -m 24 -o /home/pi/gnss/rtkrover.conf
`

通过终端内执行命令，您可以检查移动单元接收到的流。您应该能一个看到来自基站的流和一个来自移动单元本身的流。这始终是我执行的检查所有功能是否正常的第一命令之一。

 ![终端-RTKRCV流](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191225/Xe6Tpwx8Sb.jpg)

#### RTKRCV IN-STREAM – TCP / IP或串行

RTKRCV服务器可以正常工作，必须配置配置文件rtkrover.conf。我将文件存" /home/pi/gnss/rtkrover.conf "中。在下一章中，我将解释rtkrover.conf文件中GPS流的设置，从而使移动单元能够从基站接收GPS流。

首先，我解释了以下设置：可以通过wifi模块通过TCP / IP协议接收来自基站的GPS原始数据流（NVS）。接下来的几行描述了rtkrover.conf文件中的配置。

```bash
inpstr2-type = tcpcli    # (0:off,1:serial,2:file,3:tcpsvr,4:tcpcli,7:ntripcli,8:ftp,9:http)
inpstr2-path = bstation:5800
inpstr2-format = nvs     # (0:rtcm2,1:rtcm3,2:oem4,3:oem3,4:ubx,5:ss2,6:hemis,7:skytraq,8:gw10,9:javad,10:nvs,15:sp3)
```

其次，我描述了如何通过串行接口接收GPS数据流。为了通过串行接口进行通信，我安装了XBee模块。GPS信号通过RTCM3流接收。接下来的几行描述了rtkrover.conf文件中的配置。

```bash
# Base input – XBee Module
inpstr2-type = serial    # (0:off,1:serial,2:file,3:tcpsvr,4:tcpcli,7:ntripcli,8:ftp,9:http)
inpstr2-path = ttyUSB0:115200:8:n:1:off
inpstr2-format = rtcm3
inpstr2-nmeareq = off    # (0:off,1:latlon,2:single)
inpstr2-nmealat = 0    # (deg)
inpstr2-nmealon = 0    # (deg)
```

根据您的配置，移动设备可以通过TCP / IP协议或通过串行接口以RTCM3数据流的形式接收原始数据。

#### RTKRCV OUT-STREAM – NMEA

在rtkrover.conf配置文件中，设置了移动单元的输出流。NMEA输出流可提供您移动设备的精确位置。NEMA流的配置如下。

```bash
# Output 1
outstr1-type = tcpsvr    # (0:off,1:serial,2:file,3:tcpsvr,4:tcpcli,6:ntripsvr)
outstr1-path = :2947
outstr1-format = nmea       # (0:llh,1:xyz,2:enu,3:nmea)
```

但是，效果不是很好。如您在下图所示的telnet客户端输出中所见，流中有许多缝隙，没有有关实际位置的GPS信息。由于移动单元没有计算出固定位置，因此会出现这种间隙。精确的NMEA流的计算在Fix，SBAS或Float解决方案之间跳跃。每次解决方案状态更改时，我都会看到NMEA流中的空白。要获得固定解决方案还是浮动解决方案，取决于您接收的卫星数量以及接收到的GPS信号的质量。

![telnet-NMEA流](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191225/3CPKbPW7n6.jpg)

#### OUTPUT RTKRCV修复解决方案

下图显示了RTKRCV程序终端内部执行的"状态"命令。图片显示，我找到了"修复解决方案"。这应该使我的机器人将来能够非常精确地导航。在RTKRCV终端上显示所有这些信息的命令是"状态"

命令：状态

![RTK FIX解决方案](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191225/yWwBjnRMG3.png)

#### 总结

安装了基站和移动单元后，系统就可以使用了。根据接收的卫星数量，系统会非常快速地计算SBAS。15分钟后，系统通常会计算出浮动值或固定值。但是浮动值或固定值不是很稳定。系统非常频繁地在浮动和固定之间切换。我接下来要做的就是希望对系统进行调整。也许我将通过一个简单的GPS鼠标（通过USB连接到移动单元中的Raspberry Pi上）来实现一个后备解决方案。如果RTK设置根本无法计算出精确的解决方案，我将仅使用此后备解决方案。也许我会使用已经购买的以下GPS接收器作为后备系统。