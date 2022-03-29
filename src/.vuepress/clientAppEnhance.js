import { defineClientAppEnhance } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 组件
import IconList from "./components/IconList.vue"

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(ElementPlus);
  app.component('IconList', IconList)
})
