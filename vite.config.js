import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  // 第三个参数 '' 表示加载所有变量，不仅限于 VITE_ 开头的
  const env = loadEnv(mode, process.cwd(), '')

  // 这里的逻辑是：
  // 1. 优先读取 VITE_SITE_TITLE
  // 2. 如果没配置，给一个极其通用的备选（或者留空），绝对不写"猫猫导航"
  const appTitle = env.VITE_SITE_TITLE || '我的导航'
  const appDesc = env.VITE_SITE_DESCRIPTION || ''

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 自定义插件：处理 HTML 中的变量替换
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html
            .replace(/%SITE_TITLE%/g, appTitle)
            .replace(/%SITE_DESCRIPTION%/g, appDesc)
        }
      }
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
