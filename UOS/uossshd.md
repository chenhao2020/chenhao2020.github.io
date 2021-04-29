# ssh远程访问UOS桌面版

安装了UOS桌面版后，如果您需要在其他的电脑上通过ssh远程访问这台UOS系统电脑，需要的操作如下。

## 前提条件

- UOS版本号：edition（1030）和version（20）
- UOS 账号一个

## 操作步骤

1. 在**系统设置 > 通用设置 > 开发者模式**下申请root权限。
1. 申请成功后重启电脑。
1. 打开终端，输入`sudo -i`进入root用户下
1. 输入`passwd`修改root密码
1. 修改`/etc/ssh/sshd_config`中的允许root用户登录。
1. 输入`service sshd restart`重启sshd服务。



