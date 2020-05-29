---
title: GPS MODULE 天线设置
date: 2019-12-20 17:38:07
tags: 机器人小车
categories: 
- 内在提升
- 技能爱好
- 第二技能
---

为了安装带有两个RasPiGNSS Aldebaran模块的差分GPS解决方案，需要两个特殊的GPS天线。天线是不带有USB连接器的。这些天线是特殊的接收器模块，仅可接收GPS信号。基站和移动单元都需要GPS天线。按照www.drfasching.at的建议，我为基站购买了天线"Tallysman&trade;TW-2410"，为移动单元购买了" Tallysman&trade;TW-4421"天线。通过此天线基站和机器人小安装后应该可以完美工作。

下图显示了Tallysman&trade;的两种型号。图中尺寸更大的天线是Tallysman&trade;TW-2410天线。

![Tallysman GPS Antenne](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/X5ZD6mCKRX.jpg)


价格更昂贵的Tallysman&trade;TW-2410 GNSS天线能够接收GPS L1，GLONASS G1和SBAS（WAAS，EGNOS和MSAS）的频率。这种类型的天线非常适合精确定位(Precise Point Positioning, PPP）应用，因为其直径为57毫米，占用功率非常好。Tallysman&trade;TW-4421天线更小，更便宜，是机器人小车移动单元的不错选择。这种小型天线非常适合高层建筑和反射较多的市区。天线占用的空间更小，可抵抗来自树木和建筑物的GPS信号反射。我假设基站始终可以自由看见天空和地平线，基站旁边没有会干扰GPS信号的高楼大厦或树木。

<!-- more -->
#### 规格：
以下技术规格来自Tallysman&trade; TW2410 / TW2412官方网站：

**机械**：

| 值 | 描述 |
| ------ | ------ |
| Architecture: | Dual, quadrature feeds |
| Size | 57 mm dia x 15mm H | 
| Weight: | 150g | 
| Enclosure: | Radome: ASA Plastic, Base: Zamack white metal |
| Attachment Method: | Magnetic w/pre-tapped 4 x 6-32 UNC |
| Environmental: | IP67, REACH, and RoHS compliant |

**电器**：

| 值 | 描述 |
| ------ | ------ |
| LNA Gain: | 28 dB |
| Supply Current: | 15 mA typ, 25mA Q maz (85C) |
| Supply Voltage: | 2.5 to 16 VDC nominal (12VDC recommended max.) |
| Noise: | 1 dB typ. |
| Axial Ratio at Zenith  for both L1 and G1: | <1 dB |

有关天线的更多详细信息，请通过以下访问[Tallysman&trade;主页](http://www.tallysman.com/wp-content/uploads/TW2410_TW2412_Datasheet_rev4_3.pdf)。

 
**天线插头**：

天线通过连接器直接连接到RasPiGNSS模块。很容易通过螺钉与GPS模块连接。使用3m电缆，可以使用RasPiGNSS模块将天线安装在远离Raspberry Pi的位置。对于移动单元，电缆可能有点长。但我也想在汽车中或朋友的拖拉机顶部使用天线。在这种情况下，3m的电缆长度就足够了。

![Tallysman GPS Antenne RasPiGNSS模块](http://yuntu88.oss-cn-beijing.aliyuncs.com/fromlocal/1242937438@qq.com/20191223/ffSMjwp2RQ.jpg)

#### 结论：

两根天线看起来都很稳定，它们接收到的信号非常清晰和良好。它们很容易与RasPiGNSS模块连接。天线本身的防护等级为IP67，可以安装在室外。对于Raspberry Pi和所有其他电子组件，我从宜家购买了一个保护套。这是一个便宜的午餐盒，价格为6-&euro;，具有防水功能。午餐盒足够大，可以将移动电源和所有其它电子设备放入盒中。