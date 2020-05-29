---
title: GPS MODULE 概述
date: 2019-12-20 17:38:07
tags: 机器人小车
categories: 
- 内在提升
- 技能爱好
- 第二技能
---

几年前，我开始制造可以在客厅或户外行驶的机器人小车。机器人小车配备了标准的USB GPS接收器。但是我一次又一次感到失望，因为USB GPS接收器接收到的GPS位置有多么的不准确。接收到的位置精度约为4米。此时我不再使用卡尔曼滤波器（Kalman filter）。积累了些经验之后，我便开始寻找一种可以负担得起并可以内置到我的机器人小车中的精确的GPS解决方案。我经常在网站上阅读有关所谓的RTK库和所谓的差分GPS的信息。我搜索了"差分GPS"（precise GPS ）一词，并找到了使用两个差分GPS来实现精确导航的方法。但是那些解决方案非常昂贵，通常要花费数千欧元，这对于想使用Raspberry Pi构建机器人小车业余爱好者来说实在是太昂贵了。我买不起这样专业的差分GPS解决方案。

如您在下图中所见，我的室外机器人配备了USB GPS鼠标，其精度大约为4米。

![](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/E5yiiThZBb.jpg)

在研究过程中，我发现了一个很有前途的解决方案，GNSS解决方案。使用此模块，在RTK模式下（RTK = 实时运动）应该可以定位几厘米的精度。在这种情况下，可以以很高的精度将机器人小车定位在直径为20厘米的圆中。这意味着机器人位于20厘米圆圈内的某个位置。但是设置有点复杂。
<!-- more -->

我将在博客中记录我的项目进度，并撰写系统安装操作以及方案的经验的文章。

#### RTK GPS 设置

RTK GPS体系结构由两个主要部分组成。一个是基站，一个是安装在机器人小车内的移动单元。基站购买的成本约为300欧元。将安装在机器人顶部的移动单元要便宜一些，价格约为250欧元。我必须花费比专业解决方案少得多的钱，并且希望可以达到相同的精度。

![RasPiGNSS模块](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/CZZzpwf4WF.jpg)

设置包括一个固定的基站和一个安装在机器人小车内的移动单元。基站知道它的位置，并通过RTCM3流将接收到的GPS位置发送到移动单元。移动单元通过无线电与基站连接，并从基站接收GPS流和它自己的GPS位置。这使移动单元能够纠正两个GPS位置之间的GPS信号故障，并计算出自己的精确位置。对于安装程序，需要以下硬件。

- Raspberry Pi 1 Model B（或更新版本）
- Micro-SD Karte（> = 8GB）
- GPS模块RasPiGNSS"Aldebaran"
- GPS天线TW-2410
- XBee Pro无线电模块
- XBee USB适配器
- 无线局域网模块
- 套件（防水）

#### 移动单元

内置在机器人内部的移动单元的设置与基站基本相同，但有两个区别。对于移动单元，我建议使用Raspberry Pi 2 Model B或更新的型号。用于移动单元的GPS天线可以是更便宜的型号。您可以购买更便宜的TW-4421。

我使用了两个RasPiGNSS Aldebaran GPS模块，如下图所示。如您所见，它们非常适合Raspberry Pi。

![RasPiGNSS安装](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/fFDPXCNrA5.jpg)

可通过位于奥地利的在线商店www.drfasching.at获得RasPiGNSS"Aldebaran"模块和天线。

Linux大会上提供了一个RasPiGNSS模块的介绍。可以从下面的链接下载该介绍：
[GLT16_Vortrag_FFasching.pdf](https://glt16-programm.linuxtage.at/system/attachments/57/original/GLT16_Vortrag_FFasching.pdf)

#### 总结

Raspberry Pi，RasPiGNSS模块和GPS天线等所有电子组件都可以通过互联网轻松购买。将所有组件放在一起并设置非常不容易。我进行了一段时间的研究，才能找到用于基站与移动站之间通信的最佳XBee Pro模块。我搜索了带有外部天线连接器的XBee模块，以扩展天线的范围。