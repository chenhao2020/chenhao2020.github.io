---
title: 欢迎加入创意写作社！
date: 2020-7-15 16:39:14
toc: true
---

**创意写作社**使用Github来托管网站的前端代码，省去了高额的服务器费用。同时使用了目前市面上功能比较强大的Azure Devops服务，使多人协作成为可能。

如果您有意加入**创意写作社**，请仔细阅读如下教程。

后台地址：https://dev.azure.com/chenhao2020/

在本教程中，您将学习到以下内容：

- 项目介绍
- 添加和修改文章
- 提交文章审阅请求
<!-- more -->

### 项目介绍

创意写作社根据业务需要使用了如下服务：

- **版本控制(Azure Repos)**: 可以在这里，**<font color=red>添加或修改文章</font>**。
- **自动化部署（Azure Pipelines）**：代码托管到Github上。
- **计划和跟踪（Azure Boards）**：用于工作的计划和跟踪。

项目页面如下图所示：

1. 点击**docs-engineer**进入项目页面

![项目页面](/images/step1.png) 

2. 查看左侧菜单栏

![Docs-engineer项目页面](/images/step2.png)  
 
### 文章添加或修改

**创意写作社**使用了Azure Devops版本控制服务。添加或修改文章可以通过Web浏览器方式实现。

1. 进入项目代码库（**Repos**）页面，创建属于你自己的分支（**Branches**）。

![创建属于你自己的分支](/images/step3.png) 

![创建属于你自己的分支](/images/step4.png)

2. 创建完分支后，点击进入你自己的分支。**注意**：您的所有修改都是在你自己的分支上完成的。

![进入你自己的分支](/images/step5.png)

3. 在您自己的分支内，找到**_posts**文件夹。您创建的所有文章都放在这里。

![找到_posts文件夹](/images/step6.png)

![创建文章](/images/step7.png)

**注意**：文章的格式是Markdown。教程详见[怎样引导新手使用 Markdown？](https://www.zhihu.com/question/20409634/answer/90728572)。

{% raw %}<article class="message is-danger"><div class="message-body">{% endraw %}
**注意**：文章的格式是Markdown。教程详见[怎样引导新手使用 Markdown？](https://www.zhihu.com/question/20409634/answer/90728572)。
{% raw %}</div></article>{% endraw %}

**头部描述**（必填）：指名文章标题，发布日期，缩略图，密码，文章标签，文章分类等。

```yml
---
title: 创意写作社
date: 2020-7-15 16:39:14
thumbnail: /images/remenber.png
password: cyxzscn
tags: 创意写作
categories:
- 创意写作
- 写作技巧
---
```

头部下面为正文部分。

### 提交审阅请求（Pull requests）

1. 文章添加或修改完成以后，请到**Branches**页面下，点击**Create a pull request**，创建审阅请求。

![Branches页面](/images/step8.png)

![创建审阅请求](/images/step9.png)

2. 提交完审阅请求后，就是等待审核的时候了，审核通过后，文章就会自动发布出来。您可以到Pull Requests 页面查看您的请求状态。

![Pull Request](/images/step10.png)

小编微信：**cyxzscn**