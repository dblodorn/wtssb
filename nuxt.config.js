import axios from 'axios'
import webpack from 'webpack'
import whitelister from 'purgecss-whitelister'

export default {
  target: process.env.TARGET,
  env: {
    BASE_URL: process.env.BASE_URL,
    APP_TITLE: process.env.APP_TITLE,
    CMS_URL: process.env.CMS_URL,
    TARGET: process.env.TARGET,
  },
  head: {
    title: process.env.APP_TITLE || 'Where The Sun Sets Blue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content:  process.env.APP_TITLE }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/WTSSB_Fav-32x32.png' },
      { rel: 'apple-touch-icon', href: '/WTSSB_Fav-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/WTSSB_Fav-180x180.png' },
    ]
  },
  loading: { 
    color: '#fff'
  },
  css: [
    '~assets/css/main.css',
    '~assets/css/swiper.css',
    '~assets/css/wtssb.css'
  ],
  plugins: [
    { src: '~plugins/event-bus' },
    { src: '~plugins/vue-fragment' },
    { src: "~plugins/components" },
    { src: '~plugins/vue-inline-svg' },
    { src: "~plugins/global" },
    { src: '~plugins/typeSplitter' },
    { src: '~plugins/vue-awesome-swiper', ssr: false },
    { src: '~plugins/aos', ssr: false },
    { src: "~plugins/preloadAll" }
  ],
  googleAnalytics: {
    id: process.env.GA_ID,
  },
  modules: [
    '@nuxt/http',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'portal-vue/nuxt',
  ],
  http: {},
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  generate: {
    interval: 500,
    fallback: '404.html'
  },
  build: {
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      })
      if (isDev) {
        config.mode = 'development'
      }
    },
    transpile:["three"],
    postcss: {
      plugins: {
        autoprefixer: {},
        'postcss-custom-media': {
          importFrom: [
            () => {
              const { screens } = require('./globals.json')
              const customMedia = {}
              for (let size in screens) {
                customMedia[`--${size}`] = `(min-width: ${screens[size]}px)`
              }
              return { customMedia }
            }
          ]
        }
      }
    }
  }
}
