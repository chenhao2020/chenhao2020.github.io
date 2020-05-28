---
title: GPS MODULE RASPIGNSS项目一概述
date: 2019-12-20 17:38:07
tags: 机器人小车
categories: 
- 内在提升
- 技能爱好
- 第二技能
---

几年前，我开始制造可以在我的客厅或户外行驶的机器人小车。有些车辆配备了标准的USB GPS接收器。但是我一次又一次感到失望，因为从USB GPS接收机接收到的GPS位置有多么不准确。接收到的位置精度约为4米。我此时不使用卡尔曼滤波器（Kalman filter），以提高接收到的GPS位置的准确性。积累了这些经验之后，我便开始寻找一种我可以负担得起并内置到我的模型机器人车中的精确GPS解决方案。我经常在其他网站上阅读有关所谓的RTK库和所谓的差分GPS计算的信息。我搜索了"差分GPS"（precise GPS ）一词，并找到了使用两个差分GPS实现的一些产品。但是那些专业的解决方案非常昂贵。它们通常要花费数千欧元，这对于想使用Raspberry Pi构建模型机器人车这样的业余爱好者来说实在是太昂贵了。我买不起这样专业的差分GPS解决方案。

如您在下面的图片中所见，我的室外机器人配备了USB GPS鼠标，其精度大约为4米。

![](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/E5yiiThZBb.jpg)

在我的研究过程中，我发现了一个很有前途的解决方案，包括GNSS定位和Raspberry Pi，后者使用RTKLIB来计算更准确的位置。缩写GNSS代表"全球导航卫星系统"。GNSS解决方案让我更加仔细地研究了我在研究过程中发现的" RasPiGNSS Aldebaran"解决方案。使用此模块I，在RTK模式下（RTK =实时运动）应该可以定位几厘米的精度。在这种情况下，可以以很高的精度将机器人汽车定位在直径为20厘米的圆中。这意味着机器人位于20厘米圆圈内的某个位置。但是设置有点复杂，不仅仅是USB GPS鼠标这样的即插即用解决方案。
<!-- more -->
我将在这博客中记录我的项目进度，并撰写有关系统安装和操作以及我使用" RasPiGNSS Aldebaran"解决方案的经验的文章。

#### RTK GPS解决方案设置概述

RTK GPS体系结构分别由两个主要部分组成。一个是基站，一个是安装在流动站内部的移动单元。我为基站购买的解决方案的成本约为300欧元。将安装在机器人顶部的移动单元要便宜一些，价格约为250欧元。最后，我必须花费比专业解决方案少得多的钱，并且希望可以达到相同的精度。完成设置后，我将更新用于设置GNSS定位解决方案的总费用。

![RasPiGNSS模块](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/CZZzpwf4WF.jpg)

该设置包括一个固定的基站和一个安装在机器人车内的移动单元。基站知道他的位置，并通过RTCM3流将接收到的GPS位置发送到移动单元。移动单元通过无线电连接与基站连接，并从基站接收GPS流和她自己的GPS位置。这使移动单元能够纠正两个GPS位置之间的GPS信号故障，并计算出自己的精确位置。对于安装程序，我将描述您需要以下硬件。

#### 基站：
- Raspberry Pi 1 Model B（或更新版本）
- Micro-SD Karte（> = 8GB）
- GPS模块RasPiGNSS"Aldebaran"
- GPS天线TW-2410
- XBee Pro无线电模块
- XBee USB适配器
- 无线局域网模块
- 套件（防水）

#### 移动单元：

内置在机器人内部的移动站具有与基站相同的技术设置，但有两个区别。对于移动台，我建议使用Raspberry Pi 2 Model B或更新的型号。用于移动站的GPS天线可能是更便宜的型号。您可以购买更便宜的TW-4421型号。因为它几乎相同，所以我不会发布该移动台硬件的详细列表。

我使用的两个RasPiGNSS Aldebaran GPS模块，如下图所示。如您所见，它们非常适合Raspberry Pi。

![RasPiGNSS安装](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/fFDPXCNrA5.jpg)

#### 供应商RASPIGNSS" ALDEBARAN"

可通过位于奥地利的在线商店www.drfasching.at获得RasPiGNSS"Aldebaran"模块。您也可以购买设置所需的天线。店主将帮助您购买适合您需要的天线。我通过电子邮件与他讨论了最佳设置解决方案，并获得了完美的支持和快速的交付。

主页和商店：www.drfasching.at

Linux大会上还提供了一个RasPiGNSS模块的介绍。可以从下面的链接下载该j介绍：
[GLT16_Vortrag_FFasching.pdf](https://glt16-programm.linuxtage.at/system/attachments/57/original/GLT16_Vortrag_FFasching.pdf)

#### 总结
Raspberry Pi，RasPiGNSS模块和GPS天线等所有电子组件都可以通过互联网轻松购买。将所有组件放在一起并设置系统非常容易。我必须进行一段时间的研究，才能找到用于基站与移动站之间通信的最佳XBee Pro模块。我搜索了带有外部天线连接器的XBee模块，以扩展带有外部天线的范围。