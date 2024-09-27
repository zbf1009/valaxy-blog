// site.config.ts
import { defineSiteConfig } from 'valaxy';

const furigana = require("furigana-markdown-it")();
const md = require("markdown-it")().use(furigana);
const html = md.render("[猫]{ねこ}");
// html == <p><ruby>猫<rp>【</rp><rt>ねこ</rt><rp>】</rp></ruby></p>

export default defineSiteConfig({
  //默认语言
  lang: 'zh-CN',
  //可选语言
  languages: ['zh-CN', 'en'],
  //站点完整url
  url: 'https://www.031009.xyz',
  //亮暗模式
  mode: 'auto',
  // 站点标题
  title: 'Kai ki\'s Blog',
  // 作者信息
  author: {
    name: 'kai ki',
    email: '',
    link: '',
    avatar: 'https://image.you-xuan.us.kg/2024/09/25/202409251646848.jpg',
    //状态
    status: {
      /**
       * Emoji representation of your status like '👨‍💻'
       * @description 你的状态的 Emoji 表示，如 '👨‍💻'
       */
      emoji: '',
      /**
       * show when hover emoji
       * @description 当鼠标悬浮在图标上时显示
       */
      message: ''
    }
  },
  // 个人描述
  description: '皮相癫狂，词句狼藉，学问钝愚，也尽清兴。',
  //时区
  timezone: 'Asia/Shanghai',
  //显示上次上传时间/最近编辑时间
  lastUpdated: true,
  //网站图标
  favicon: '',
  //启用评论
  comment: {
    enable: true
  },
  //第三方CDN挂载
  //@default 'https://unpkg.com/'
  cdn: {
    prefix: ''
  },
  // 字数统计
  statistics: {
    enable: true,
    readTime: {
      speed: {
        /**
         * Chinese word count speed
         * @description 中文每分钟阅读字数
         * @default 300 (300 字/分钟)
         */
        cn: 300,
        /**
         * English word count speed
         * @description 英文每分钟阅读字数
         * @default 100 (200 字/分钟)
         */
        en: 100
      }
    }
  },
  mediumZoom: {
    //启用图片预览
    enable: true
  },
  vanillaLazyload: {
    enable: true
  },
  //启用搜索
  search: {
    enable: true,
    /**
     * Search Type
     * - algolia: Algolia Search
     * - engine: Engine Search, like Google/Baidu
     * - fuse: Local Search by fuse.js
     */
    type: 'fuse'
  },
  //本地搜索设置
  fuse: {
    /**
     * @default 'valaxy-fuse-list.json'
     * @description 搜索结果列表数据所在路径
     */
    dataPath: 'valaxy-fuse-list.json'
    /**
     * @see https://fusejs.io/api/options.html
     */
  },
  //文章所使用的协议，默认使用 Creative Commons
  //default https://creativecommons.org/licenses/
  license: {
    //是否显示在文章底部
    enabled: true,
    //证书语言
    //when lang === 'zh-CN', use 'zh'
    language: 'zh',
    //证书类型
    type: 'by-nc-sa'
  },
 //打赏/赞助
  sponsor: {
    enable: true,
    methods: [
      {
        name: '支付宝',
        url: 'https://image.you-xuan.us.kg/2024/08/27/202408271858930.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: '微信支付',
        url: 'https://image.you-xuan.us.kg/2024/08/27.png',
        color: '#2DC100',
        icon: 'ri:wechat-pay-line',
      },
    ],
  },
  //社交链接
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
  ],
  feed: {
    /**
     * name: feed -> feed.xml / feed.atom / feed.json
     * @default '' -> feed.xml / atom.xml / feed.json
     */
    name: 'atom',
    favicon: 'i-ri-rss-line'
  },
  //限制代码块的高度，单位是 px
  codeHeightLimit: 300
})



/**
 * @zh 社交链接
 */
export interface SocialLink {
  /**
   * The title of your link
   */
  name: string
  link: string
  /**
   * 图标名称
   * https://icones.js.org/
   */
  icon: string
  /**
   * @zh 图标颜色
   */
  color: string
}


// shared with valaxy node and client
export interface SiteConfig {

  /**
   * 副标题
   */
  subtitle: string

  feed: {
    /**
     * name: feed -> feed.xml / feed.atom / feed.json
     * @default '' -> feed.xml / atom.xml / feed.json
     */
    name: string
    favicon: string
  }

  /**
   * 社交链接
   */
  social: SocialLink[]


}


