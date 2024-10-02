---
title: scoop的安装与配置
categories:
  - 教程
  - 软件教程
tags:
  - scoop
  - 教程
date: 2024-08-25 22:43:10
time_warning: true
excerpt_type: text
---

## 为什么需要 scoop？

按照常理，一篇安利软件的文章，第一部分的标题应当是“XXX 是什么”，而不是“为什么”，但要说清楚`scoop`是什么，也就是一句话的事情：一款由`Luke Sampson` 开发的命令行下载安装工具，这就是它的全部，仅此而已。

所以，真正关键的问题应该是：**为什么在 2000 年后，我还需要一款简陋到连 GUI 界面都没有的命令行软件安装工具？** 这才是我们需要首先说明的部分。

<!-- more -->

答案也很简单，因为它的如下特点：

- 没有权限弹出窗口
- 隐藏 GUI 向导式安装程序
- 防止因安装大量程序造成的环境变量（PATH）污染
- 避免安装和卸载程序的不当使用（清洁安装，干净卸载）
- 自动查找并安装依赖项
- 自动执行所有额外的设置步骤来获取工作程序

说到这里，其实你应该已经明白它最强大的应用场景——正是软件批量管理/包管理。想象一下，你是一个工作多年的程序员，现在出于某种不可避的原因要换电脑，于是需要重新在新电脑上搭建`git`、`java`、`node`，或是其他环境，正常来讲，你可能需要分别去对应的官网下载对应版本的安装程序，手动开启一个个安装窗口，完成后再一个个去更改配置，设置环境变量……然而，在 scoop 中，一切变得前所未有的简单。安装`git`只需要一行代码`scoop install git`，卸载也只需要`scoop uninstall git`，对所有通过`scoop`安装的软件进行任何操作，都可以在一个命令行窗口下，通过简单输入几行命令完成，其对效率的提升不可谓不惊人。

## scoop 安装

### 准备工作

- `PowerShell`：确保已安装`PowerShell 5.0`或更高版本

  ::: info

  windows 10 及更高版本默认已安装 PowerShell 5.0

  :::

- 确保已允许`PowerShell`执行本地脚本。

  ```bash
  set-executionpolicy remotesigned -scope currentuser
  ```

### 开始安装

#### 自定义安装目录

`scoop`的默认安装路径为`C:\Users\[username]\scoop`，如要改换安装路径，则需要将该路径手动添加到用户变量中。

例如，将`scoop`安装在`C:\Scoop`路径下。
添加该路径到**用户变量**中：

```bash
$env:SCOOP='C:\scoop'
[environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'User')
```

::: tip

当然也可以添加到**系统变量**中，不过此时需要以**管理员身份**运行 PowerShell，或是以**管理员身份**运行 Windows Terminal,再打开 PowerShell，否则会报错。

```bash
[environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'Machine')
```

<font color="#c0504d">添加完环境变量后需要重启 PowerShell 或 Terminal 等待变量生效。</font>

:::

#### 自定义全局应用安装目录

需将该目录手动添加到系统变量中，再进行安装，步骤同上：

例如，将自定义全局应用安装在`C:\apps`路径下：

1. 以管理员身份运行
2. `$env:SCOOP_GLOBAL='C:\apps'`
3. `[environment]::setEnvironmentVariable('SCOOP_GLOBAL',$env:SCOOP_GLOBAL,'Machine')`

::: info

所谓“全局应用安装目录”，即：正常安装软件时，在选择“仅为当前用户安装”或“为此电脑所有用户安装”时选择后者，此时的应用安装目录。因此，这一步的更改仅对全局安装应用生效（对应指令`scoop install -g <app>`），对于一般的默认应用安装(对应指令`scoop install <app>`)，安装目录应当为 scoop 本体安装目录下的 apps 文件夹。

:::

#### 安装 scoop 本体+设置镜像源

`scoop`的官方下载源在`github`，然而，由于众所周知的原因，国内`github`访问不通畅，导致`scoop`体验极差。在无代理的国内网络环境下，安装`scoop`，你依次会遇到的问题是：

1. 首先从`GitHub Raw`下载  [Scoop 安装脚本](https://raw.githubusercontent.com/ScoopInstaller/Install/master/install.ps1)，此时下载会失败。
2. 如果第一步成功后，会下载  [Scoop 仓库存档](https://github.com/ScoopInstaller/Scoop/archive/master.zip)  和  [Main 应用仓库存档](https://github.com/ScoopInstaller/Main/archive/master.zip)，此时下载又会失败。
3. 如果第二步成功后，会先下载`7-Zip`和`Git`来做后面的事，因为  [7-Zip 的官网](https://www.7-zip.org/)  也会偶尔无法访问，`Git`下载地址在  [GitHub Releases](https://github.com/git-for-windows/git/releases)，此时下载又会失败。
4. 如果第三步成功后，会从官方 Main 应用仓库检出代码，地址在  [GitHub 仓库](https://github.com/ScoopInstaller/Main)，此时下载又会失败。
5. 如果第四步成功后，更新 `Scoop`时会从官方`Scoop`仓库检出代码，地址在  [GitHub 仓库](https://github.com/ScoopInstaller/Scoop/)，此时下载又会失败。
6. 后续添加、检出 extras 等应用库都会失败。

针对这种情况，国内已有项目将`scoop`主程序库托管在`gitee`，增加分流逻辑处理安装与更新所涉及的资源，能够确保系统在有代理/无代理+国内/国外等各种环境下都能匹配到合适的下载源，本次我们便在安装阶段解决这些问题。

##### A 初次安装

1. 以管理员权限打开`Windows PowerShell`
2. 执行安装命令`iwr -useb scoop.201704.xyz | iex`

##### B 已安装 scoop

（适用于已安装官方源`scoop`，或更改过其他镜像地址的人使用）

1. 更换`scoop`的`repo`地址
   `scoop config SCOOP_REPO "https://gitee.com/scoop-installer/scoop"`
2. 拉取新库地址`scoop update`

::: tip

对于 B 类人群，若已使用官方源或其他镜像源 scoop 下载过 bucket 库，请依次删除后再用新库地址重新下载，最后执行 scoop update，否则该步骤会出现报错。

:::

至此，`scoop`本体安装完成。

## scoop 使用配置

### scoop 的配置逻辑

所有的包管理器都会有相应的软件仓库 ，而`bucket`就是 `scoop`中的软件仓库。正如`scoop`  的中文翻译是“舀”，而  `bucket`  是 “水桶”，`scoop`安装软件的流程就如从水桶里舀水，既生动又形象。

在安装时，`scoop`自带一个默认软件仓库（`main bucket`），已配置好了网络访问地址，并将索引信息添加到了本地，这表明你已经可以从这个库中检索软件，并通过访问地址进行软件下载。

当然，默认仓库中软件的数量是有限的，通过  `scoop bucket known`  命令，你可以可以查看官方认可的其他`bucket`，如果有需要，再将其手动添加，拓展可下载的软件数量。

:::info

官方认可的 bucket 库：

```
main
extras
versions
nightlies
nirsoft
php
nerd-fonts
nonportable
java
games
jetbrains
```

:::

如果官方库中仍未找到你需要的软件，`scoop`还允许你添加由社区提供的第三方库，这里给出一个第三方软件源[Scoop Directory](https://github.com/rasa/scoop-directory)，它记录了`github`上各种`bucket`。

### 添加 bucket

1. 安装`git`
   `scoop install git`
   （此为必装程序，`scoop`及`bucket`更新均依赖此软件）
2. 安装`aria2`
   `scoop install aria2`
   （此为选装程序，最重要的功能是提供多线程下载加速）
3. 添加官方`bucket`
   查询官方`bucket`：`scoop bucket known`
   添加官方`bucket`：`scoop bucket add extras`
4. 添加第三方`bucket`
   基本语法：`scoop bucket add <别名> <git地址>`
   例如，添加`scoopcn`：
   `scoop bucket add scoopcn https://gitee.com/scoop-installer/scoopcn`

::: info

目前官方 bucket 已镜像至 gitee，可访问[链接](https://gitee.com/organizations/scoop-installer/projects)获取对应 bucket 库连接，然后按照添加第三方 bucket 方法添加即可。

:::

## scoop 使用实操

现在，我们以一个简单的实例来演示`scoop`的实际使用。

前些天，我在`github`上发现了一款钟意的[第三方网易云音乐播放器](https://github.com/qier222/YesPlayMusic)，然而，在我发现这一项目时，作者尚未在`Release`页面发布编译好的安装包，但给出了`scoop`的安装命令，因此，我们可以尝试在联网状态下，直接用本地`PowerShell`命令行完成软件的下载安装。

作者给出的安装命令为：`scoop install extras/yesplaymusic`，可以看出，该软件包含在`extras`库中，因此，只要我们在`scoop`中添加`extras`库，便可以在`PowerShell`中通过命令行直接完成安装。（当然，也有[更复杂一些的使用实例](https://www.thisfaner.com/p/scoop/#%E5%AE%89%E8%A3%85%E5%92%8C%E5%88%87%E6%8D%A2jdkpython%E7%9A%84%E7%89%88%E6%9C%AC)。）

## 附录：常用命令

### 帮助

```bash
# 查看scoop的命令
scoop help

# 查看命令的详细信息
scoop help <command>
# for example: scoop help install
# For more detailed information on INSTALL
```

### 软件安装

```bash
# 基本语法（为当前用户安装）
scoop install <库名/软件名>
# for example:
scoop install qq

# 指定bucket库的软件（如需要）
# for example:
scoop install scoopcn/wechat

# 一条命令安装多个软件
# for example:
scoop install qq wechat aria2

# 为所有用户安装（以管理员身份运行）
scoop install <app> -g
# for example:
# scoop install nano -g
```

### 软件卸载

```bash
# 基本语法（卸载某一程序/多个程序）
scoop uninstall <app>
# for example:
scoop uninstall qq wechat

# 卸载程序并移除配置文件
scoop uninstall <app> -p

# 卸载全局程序
scoop uninstall <app> -g
```

### 更新

```bash
# 更新scoop及所有bucket但不更新app
scoop update

# 更新某一app
scoop update <app>

# 更新scoop、bucket、app
scoop update *

# 更新全局app
scoop update <app> -g
```

### 安装包缓存

`scoop`支持使用命令让同一程序在不同版本间切换，但这一功能要求对应版本的程序需要存在于本地系统中。也正是因此，在软件安装、更新时，为了支持版本切换，`scoop`默认不会删除下载的安装包，长期累积下，这会占用大量的磁盘空间，如果你确认自己不会用到某个软件的老版本，请使用命令及时清理。

```bash
# 显示安装包缓存
scoop cache show

# 删除指定应用的安装包缓存
scoop cache rm <app>

# 删除所有的安装包缓存
scoop cache rm *

# 本次安装时临时禁用安装包缓存
scoop install -k <app>

# 本次升级时临时禁用安装包缓存
scoop update -k *

# 删除指定软件的旧版本
scoop cleanup <app>

# 删除所有软件的旧版本
scoop cleanup *
```

### 其他常用操作

```bash
# 查看已安装app
scoop list

# 查看可更新app
scoop status

# 查看某app主页
scoop home <app>

# 查看官方库
scoop bucket known

# 添加官方库
scoop bucket add <bucket>

# 查看已添加的库
scoop bucket list

# 删除已添加的库
scoop bucket rm <bucket>

# 添加第三方库
scoop bucket add <bucket> <bucket_url>

# 切换程序版本（要求对应版本已安装在本地）
scoop reset <app>@<version>

# 切换到最新版本
scoop reset <app>
```

## 参考文章

[Scoop: scoop 国内镜像优化库](https://gitee.com/scoop-installer/scoop#https://gitee.com/scoop-installer#122-%E5%85%B6%E4%BB%96%E4%BC%98%E7%A7%80%E7%9A%84%E9%95%9C%E5%83%8F%E5%BA%93)

[Windows 下包管理器 Scoop 的安装与使用](https://muxiner.github.io/using-scoop/#%F0%9F%8D%92-%E5%85%B6%E4%BB%96%E6%9C%89%E7%94%A8%E6%93%8D%E4%BD%9C)

[教程\_Scoop:超好用的 Windows 包管理器 ](https://www.cnblogs.com/Edge-coordinates/p/15130184.html)

关于`scoop`支持的下载器`aria2`的配置、安装报错、疑难解答可以参考上述文章，更多进阶内容可参考[官方文档](https://github.com/ScoopInstaller/Scoop/wiki)
