import { defineValaxyConfig } from 'valaxy'
import { addonMeting } from 'valaxy-addon-meting'
import { addonWaline } from 'valaxy-addon-waline'
import type { ThemeConfig } from 'valaxy-theme-hairy'

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
  "since": 2016,
  // 标注博客信息(theme / valaxy)
  "powered": false
},
  "nav": [
    {
      "text": "Home",
      "link": "/",
      "icon": "ri:home-4-line"
    },
    {
      "text": "categories",
      "icon": "ri:folder-2-line",
      "link": "/categories/"
    },
    {
      "text": "tags",
      "icon": "ri:price-tag-3-line",
      "link": "/tags/"
    },
    {
      "text": "about",
      "icon": "i-ri:user-line",
      "link": "/about/"
    }
  ]

  },


  addons: [
    addonMeting({
      global: true,
      props: {
        // 设置你的网易云/qq或其他歌单 ID
        id: '5312894314',
        type: 'playlist',
        autoplay: false,
        theme: 'var(--hy-c-primary)',
      },
    }),
    // 请参考 https://waline.js.org/ 设置 serverURL 地址
    addonWaline({
      comment: true,
      serverURL: 'https://vercel-waline-kappa.vercel.app/',
      emoji: ['https://unpkg.com/@waline/emojis@1.2.0/tw-emoji','https://unpkg.com/@waline/emojis@1.2.0/bilibili'],
      pageview: true,
      search: true,
    }),
  ],
})
