---
title: 五分钟，免费搭建翻译终极方案
date: 2024-10-18 21:10:04
categories:
  - 教程
  - 项目教程
tags:
  - 翻译
  - DeepLX
  - Cloudflare
time_warning: true
excerpt_type: text
---

## 前言

我想，你人生中一定有这样一些瞬间：查文献，对着满屏的专业术语无从下手；找资源，面对外文网站的机翻满脸问号；哪怕发推看推，海对面 bro 们的俚语和流行梗，对国人而言显然也够喝一壶……这个时候，一个好的翻译就显得格外重要。内容没有国界，但语言却有实实在在的门槛，要想跨过这道槛，我们必须得借助一些工具，但，很多时候，这些工具却反而会带来新的阻碍。

<!-- more -->

AI 兴起的当下，好的大模型翻译可以拥有远超传统机器翻译的质量，然而，大模型不仅普遍收费昂贵，而且并发数受到限制，很难在要求高并发的环境中完成任务（如推特和大文本量网站的实时滑动翻译）。

传统的机器翻译倒是够快，也基本不受并发数限制，但经过多年的发展，目前其中的大部分，在质量上仍然很难令人满意——难道，我们就没有两全其美的办法吗？

## 为什么是 DeepL？

早在“前 AI 时代”，DeepL 翻译就被认为是全世界最准确的机器翻译，比最接近的竞争对手准确三倍以上。以下内容是早期挂在 DeepL 官网上的翻译对比：

英文原文：

- Walking on eggshells during the software update.
- Wang's VR game is a rollercoaster of emotions.
- Caught between a rock and a hard drive with this coding dilemma.

| DeepL | 微软翻译 |
| :----: | :----: |
| 在软件更新时提心吊胆 | 在软件更新期间在蛋壳上行走 |
| Wang 的 VR 游戏让人的情绪如过山车般起伏不定 | Wang的VR游戏是情绪的过山车 |
| 编码难题让我左右为难 | 夹在岩石和硬盘驱动器之间，陷入这种编码困境 |

在跨入 AI 时代后，DeepL 同样是最早一批使用 AI 进行翻译模型训练的翻译器，相比于 openAI 等公司的 AI 模型翻译，早在此领域浸淫多年的 DeepL，无论是专业度还是准确性，显然只会更胜一筹。于是，现在 DeepL 官网上相关页面变成了这样：

![alt text](https://image.you-xuan.us.kg/2024/10/18/DeepL.png "差距变小，但依然冠绝群雄")

## 为什么是 DeepLX？

是的，DeepL很好，很强大，如果没有其他问题，我当然会建议你直接使用 DeepL 的官方翻译服务，但显然，实际情况并不全然如此。

**最主要的问题是，DeepL 的官方服务器部署在海外，国内访问阻力很大，哪怕挂梯使用官方 app，仍然时不时会连接超时或无响应；其次，如果想在翻译软件中使用 DeepL 的 API，或者在自己的代码执行中调用其 API 来完成任务，就得注册账号并绑定信用卡，其免费计划提供每月 50 万 Token 额度。但是，中国的信用卡无法绑定。没错，不是不支持银联或者 VISA，就是单纯不支持国内的卡。**

然，针对这种局面，各路能人异士显然不会袖手旁观，DeepLX 就此应运而生。简单来说，这是一个开源项目，它基于 DeepL 免费服务，能够将其转换为本地 API，提供给第三方程序使用。

说人话就是: **DeepL 可以免费使用，但有限制，而使用 DeepLX 可以无限制的调用 DeepL API 来翻译。**

现在，一种新的可能性已经出现，下面，我们就将其变为现实。

## DeepLX 部署

目前，在 github 上已经出现了许多种成熟的部署方案，如果你有自己的云服务器资源，那么我推荐[OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX)方案，使用 Docker 一键完成，并发数和速度可以完全取决于服务器的上限。

然而，服务器资源，大部分还得花点小钱，既然咱都已经下定决心折腾，能不能更进一步？就是说……有没有……那个……（苍蝇搓手.jpg）

当然，这时候就要请出我们的赛博菩萨 Cloudflare 出场了！基于 Cloudflare 的 **免费** Workers 服务，我们可以使用[deeplx-for-cloudflare](https://github.com/ifyour/deeplx-for-cloudflare)实现更方便的 0 支出部署，此方案下，我们要做的只有四步：注册 Cloudflare Workers 账户、新建 Worker、复制粘贴、点击“完成部署”。

::: info

Cloudflare Workers 也需要绑定银行卡，只不过相比 DeepL，对国内卡没有任何限制。具体的注册+绑卡流程可以参考本站往期内容：[搭建一个属于你的免费图床（PicList+Cloudflare R2）](https://031009.xyz/posts/Build-your-own-free-figure-bed-(PicList+Cloudflare%20R2))，此处不再赘述。

:::

完成相关步骤后，我们应当能够进入 Cloudflare 的仪表板界面，在左侧导航栏找到 Workers 和 Pages 的相关页面，点击：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step1.png "猴子都能看懂的步骤")

点击：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step2png.png "猴子都能看懂的步骤2")

继续点击：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step3png.png "猴子都能看懂的步骤3")

起个名，代码部分先不用管，直接部署：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step4.png "猴子都能看懂的步骤4")

成功后，我们再点击“编辑代码”：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step5.png "猴子都能看懂的步骤5")

代码？我还得会代码？不存在的。现在，来到我们 github 项目的 [index.js 部分](https://github.com/ifyour/deeplx-for-cloudflare/blob/main/dist/index.js)，看到下面的内容了吗？看到右上角的复制按钮了吗？点击一下：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step6.png "猴子都能看懂的步骤6")

回到我们 Cloudflare 的编辑器界面，现在，对着里面的内容，使用你键盘上高贵的`Ctrl+A`、`Delete`、`Ctrl+V`，然后点击部署，恭喜！我们克服了重重困难！已经完成了最复杂的内容（笑）！

然后，回到 Workers 列表，点击“访问”，现在，你可以在网址栏看到你的 API 调用地址，它应当类似如下形式：

https://XXX.workers.dev/translate

当然，如果你有自己的域名，也可以在设置中绑定自己的自定义域，以便让这个地址看起来更优雅一些。

现在，让我们来测试一下！

## 调用 DeepLX 进行网页翻译

受够了 edge 浏览器里二到不行的微软网页翻译？我们马上就来解决这一问题。在设置中关闭默认翻译后，我们可以使用浏览器拓展：沉浸式翻译来进行上位替代。

在[沉浸式翻译官网](https://immersivetranslate.com/zh-Hans/)选择适合你浏览器拓展，安装后，我们来到其设置界面。把左侧的导航栏下拉，你应当可以看到“开发者设置”，点它，然后打开“beta 测试特性”：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step7.png "猴子都能看懂的步骤7")

这样，我们就应当能在翻译服务中开启 DeepLX 服务：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step8.png "猴子都能看懂的步骤8")

这里，我们填入之前的 API 调用地址：

![alt text](https://image.you-xuan.us.kg/2024/10/18/step9.png "猴子都能看懂的步骤9")

点击右上角，测试一下，成功即可：

![alt text](https://image.you-xuan.us.kg/2024/10/19/step10.png "猴子都能看懂的步骤10")

当然，除了用于支持第三方 API 的网页翻译插件外，你还可以将其嵌入你的程序中运行。以下便是一个简单的 Python 调用示例：

```Python

import httpx,json

deeplx_api = "https://your-api-domain.com/translate"
deeplx_access_token = "your-api-access-token"
text = "Top Japan Bank Builds Startup Fund as Policy Push Lures Lenders"


def tr_deeplx(content):
     data = {
          "text": content,
          "source_lang": "EN",
          "target_lang": "ZH"
     }

     headers = {'Content-Type': 'application/json',
                'Authorization': f'Bearer {deeplx_access_token}'
     }

     post_data = json.dumps(data)
     r = httpx.post(url = deeplx_api, data = post_data, headers=headers).text
     return json.loads(r)["data"]

print(tr_deeplx(text))

```

完成！现在，前往新世界吧！

::: tip

当然，DeepLX 也不可能做到全无缺陷。目前已知的问题有：

1.在短时间内频繁请求时会发生 429 错误（429 Too Many Requests）

2.免费的 Workers 项目有每分钟 1000 次和每天 10 万次的请求限制（更多限制可查阅 Cloudflare 官方文档），因此，在此方案下，超限请求也会引发 429 或其他类型的错误

临时的解决方法只能是在调用时适当限制并发数和频次，不过，比起优势，个人认为，这点问题是完全在可承受范围内的。

:::

## One More Thing

<abbr data-title="所以才说现在的年轻人啊😩……" > 这听起来可能有点过分，但……如果我真的懒到连这几步都不想做呢？</abbr>

当然，也有更简单的方案，可基于 [guobao2333/DeepLX-Serverless](https://github.com/guobao2333/DeepLX-Serverless)实现，需要的只有一个 [vercel](https://vercel.com) 账号和 github 账号。

账号注册完成后，在项目的 README 部分，你能够看见一个显眼的部署按钮：

![alt text](https://image.you-xuan.us.kg/2024/10/19/deploy.png "部署")

点击，然后你会跳转到 vercel 的项目部署界面，你唯一需要做的就是关联你的 github 账号，给你的项目起个名，再点击那个看起来最像“部署”的按钮，稍等片刻，所有的事情就都完成了。

此时，回到 vercel 的个人仪表板，你可以在“Projects”下找到你的项目，“Domains”即为 vercel 为你的项目分配的域名：

![alt text](https://image.you-xuan.us.kg/2024/10/19/domains.png "你的域名")

同理，你也可以像在之前的方案中一样，绑定自己的自定义域名，但，到这里还没完——记得我们之前给出的 API 调用地址形式吗？要在其他地方正确调用，你还需要做一些小小的修改——前面加上“https://”，中间是你的域名，最后加上“/translate”即可。

值得一提的是，相比更早的 [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX) 方案和我们上文的方案， **这一部署利用了无服务器函数(边缘函数)请求 IP 不固定的特性，因此可以一定程度上避免 429 错误发生得过于频繁。** 当然，由于我们用的是 vercel 的免费服务，所以，相应的请求频率、并发数和配额限制就是由 vercel 决定了，你可以在其官方文档中查看免费项目的各项上限。

<abbr data-title="😡😡😡">可是吧……毕竟要开两个账户，还得手动部署，我还是嫌麻烦，怎么办？</abbr>

好吧……如果，你真的连如此简单的方案也无法执行，那么在下还有一计，这只需要你有一个 github 账号即可：[点这里](https://deeplx.missuo.ru/)，授权使用你的 github 账号连接，你应该就能看到如下界面：

![alt text](https://image.you-xuan.us.kg/2024/10/19/api.png "完全白嫖的 DeepLX API")

点击“copy API Endpoint”，粘贴到沉浸式翻译，或是其他需要使用的地方即可。

::: info

此方案中的配额是根据 github 账号的注册时间来决定的，如果帐号注册超过三年，你可以获得每天 50 万字符的配额，不足三年，每天就只有 1 万， **如果使用时出现 403 错误，是因为屏蔽了所有中国大陆的 IP，如何解决，想必不需要我多说。**

:::

::: warning

**方案提供者已声明，此 API 仅用于个人用途。如果你将 API 出售给任何人，你会被永久拉黑。**

:::

~~可是……~~

**我当然知道还有人会说什么——如果我连 github 账号也不想注册，有什么办法能用上 DeepLX 吗？**

[这里](https://github.com/wangwangit/deeplx_free?tab=readme-ov-file)有一个经过部署者允许的，对外开放的 DeepLX API 清单，所有列在上面的 API 都可供个人随意使用，你只需要复制粘贴就好。只不过，**如此一来，你就得和不知多少人共用一个端口，且稳定性得不到保障。如果你对数据和隐私没有很高的要求，或者只是临时使用，那倒无妨，否则我还是会建议你选择适合自己的方案,私人部署。**

## 参考文章

[在沉浸式翻译中使用 DeepLX](https://eisuto.xlog.app/zai-chen-jin-shi-fan-yi-zhong-shi-yong-DeepLX?locale=zh)

[DeepLX在沉浸式翻译和Bob翻译的使用及Cloudflare部署](https://kitety.com/article/deeplx-usage-and-deployment#4e0b922ee20f44c395a8a6b5031384b8)

[【技巧】搭建一个自己的deepl翻译](https://blog.laomao.icu/posts/82f2c97d/)
