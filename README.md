将GitBook发布到您的GitHub Page


这些天，我正在写指导手册。之后，我想将其发布为网站。因此，我研究了适合以下需求的解决方案。

基于Markdown语法编写文档
嵌入视频
生成一个网站
搜索文件
自订主题
GitBook看起来是一个不错的选择。请参阅使用它生成的网站“前端手册”。它根据降价文档生成一个静态网站。要安装它，您只需要键入一个命令行即可。

❯ npm install -g gitbook-cli
之后，您可以使用gitbook init命令进行初始化。这将生成两个文件：README.md和summary.md。

README.md是第一页，并包含一个简介。
Summary.md包含目录，该目录显示为左幻灯片菜单。
❯ gitbook init
info: create README.md
info: create SUMMARY.md
info: initialization is finished

❯ ls
README.md  SUMMARY.md
修改文档后，运行gitbook serve命令。如果您的文档被修改，它将对其进行检测并自动更新静态站点。

❯ gitbook serve
Live reload server started on port: 35729
Press CTRL+C to quit ...

info: 7 plugins are installed
info: loading plugin "livereload"... OK
info: loading plugin "highlight"... OK
info: loading plugin "search"... OK
info: loading plugin "lunr"... OK
info: loading plugin "sharing"... OK
info: loading plugin "fontsettings"... OK
info: loading plugin "theme-default"... OK
info: found 1 pages
info: found 0 asset files
info: >> generation finished with success in 0.6s !

Starting server ...
Serving book on http://localhost:4000
如果您只想构建一个静态站点，请运行gitbook buid而不是gitbook serve。

当您打开网站时（打开index.html或http://localhost:4000），您将看到类似的页面。

最后但并非最不重要的一点是，作为网站发布。Github Pages允许我们自由发布静态网站。您需要做的是将文件添加到gh-pages分支中。我们已经为此生成了文件。因此，剩下的就是将这些fil添加到gh-pages分支中。不幸的是，gitbook不支持将其作为命令行选项。您需要手动进行。为了轻松做到这一点，我创建了一个shell脚本。

＃安装插件并构建静态站点
gitbook安装&& gitbook构建

＃检出gh-pages分支
git checkout gh-pages

＃拉最新的更新
git pull origin gh-pages --rebase

＃将静态站点文件复制到当前目录。
cp -R _book / *  。

＃删除'node_modules'和'_book'目录
git clean -fx node_modules
git clean -fx _book

＃添加所有文件
git的添加。

＃提交
git commit -a -m “更新文档”

＃推到原点
git push原始gh-pages

＃结帐到master分支
git checkout主
查看GitHub 托管于❤的原始publish_gitbook.sh
每当您运行此脚本时，它将为静态网站生成文件并推送到gh-pages分支中。使用TeamCity这样的持续集成，可以每小时或在更改存储库文件时触发它。

❯ ./publish_gitbook.sh
您的网站将在提供http(s)://<username>.github.io/<projectname>。

如果要使用GitBook，但对发布github页面不感兴趣，请查看GitBook site。您可以使用漂亮的所见即所得（所见即所得）编辑器在网站上轻松创建手册。

参考文献
GitBook
GitBook CLI
创建项目页面