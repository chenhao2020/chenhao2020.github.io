### 将GitBook发布到您的GitHub Page


这些天，我正在编写指导手册。我想将其发布到GitHub Page。因此，我研究了以下方案。

- 基于Markdown语法编写文档
- 嵌入视频
- 生成一个网站

GitBook看起来是一个不错的选择。它根据Markdown文档生成一个静态网站。要安装它，您只需要键入一个命令行即可。

`npm install -g gitbook-cli`

之后，您可以使用 `gitbook init` 命令进行初始化。这将生成两个文件：README.md和SUMMARY.md。

README.md是一个简介。
Summary.md是图书目录。

```
❯ gitbook init
info: create README.md
info: create SUMMARY.md
info: initialization is finished

❯ ls
README.md  SUMMARY.md
# 修改文档后，运行gitbook serve命令。

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
```
如果您只想构建一个静态站点，请运行 `gitbook buid` 而不是`gitbook serve`。

当您打开网站时（打开`index.html`或`http://localhost:4000`），您将看到类似的页面。

最后作为网站发布。

Github Pages允许我们自由发布静态网站。您需要做的是将文件发布到gh-pages分支中。我们已经为此生成了文件。因此，剩下的就是将这些_book下的文件添加到gh-pages分支中。不幸的是，gitbook不支持将其作为命令行选项。您需要手动进行。为了轻松做到这一点，我创建了一个shell脚本。

```
＃安装插件并构建静态站点
gitbook install & gitbook build

＃创建gh-pages分支
git checkout gh-pages

＃拉取更新
git pull origin gh-pages --rebase

＃将静态站点文件复制到当前目录。
cp -R _book/* .

＃删除'node_modules'和'_book'目录
git clean -fx node_modules
git clean -fx _book

＃添加所有文件
git add .

＃提交
git commit -a -m "Update docs"

＃推到原点
git push origin gh-pages

＃切换到master分支
git checkout master


＃每当您运行此脚本时，它将为静态网站生成文件并推送到gh-pages分支中。

❯ ./publish_gitbook.sh
您的网站将发布在http(s)://<username>.github.io/<projectname>。

```

如果要使用GitBook，但对发布Github Page不感兴趣，请查看GitBook官网。您可以使用漂亮的所见即所得编辑器在网站上轻松创建手册。

