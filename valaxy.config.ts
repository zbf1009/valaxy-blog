import { defineValaxyConfig } from 'valaxy'
import { addonWaline } from 'valaxy-addon-waline'
import type { ThemeConfig } from 'valaxy-theme-hairy'
import { addonComponents } from 'valaxy-addon-components'
import { HitokotoType, addonHitokoto } from 'valaxy-addon-hitokoto'
import { SpeedInsights } from "@vercel/speed-insights/next"

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineValaxyConfig<ThemeConfig>({
  theme: 'hairy',
  themeConfig: {
  "layout": {
    "post": "image:slice:reverse"
  },
  "footer": {
  // 建站时间
  "since": 2024,
  // 标注博客信息(theme / valaxy)
  "powered": true,
  //备案信息
  "beian": {
    enable: true,
    "icp": "鄂ICP备2024076488号-1",
  },
},
  "nav": [
    {
      "text": "Home",
      "link": "/",
      "icon": "ri:home-4-line"
    },
    {
      "text": "Categories",
      "icon": "ri:folder-2-line",
      "link": "/categories/"
    },
    {
      "text": "Timeline",
      "icon": "i-ri:timeline-view",
      "link": "/archives/"
    },
    {
      "text": "Tags",
      "icon": "ri:price-tag-3-line",
      "link": "/tags/"
    },
    {
      "text": "About",
      "icon": "i-ri:user-line",
      "link": "/about/"
    },
  ]
  },

  addons: [
    // 请参考 https://waline.js.org/ 设置 serverURL 地址
    addonWaline({
      comment: true,
      serverURL: 'https://comment.031009.xyz/',
      emoji: ['https://unpkg.com/@waline/emojis@1.2.0/tw-emoji','https://unpkg.com/@waline/emojis@1.2.0/bilibili','https://unpkg.com/@waline/emojis@1.2.0/bmoji','https://unpkg.com/@waline/emojis@1.2.0/qq','https://unpkg.com/@waline/emojis@1.2.0/tieba','https://unpkg.com/@waline/emojis@1.2.0/weibo'],
      pageview: true,
      search: true,
      locale: {
        placeholder: '欢迎评论！填写邮箱，在被回复时可收到邮件通知哦！(≧∇≦)ﾉ',
        sofa: '没人？我来喵两句(=✪ᆽ✪=)'
      }
    }),
    addonComponents(),
    addonHitokoto({
      args: [HitokotoType.Animation,HitokotoType.Comic,HitokotoType.Literature],
    })
  ],
})

