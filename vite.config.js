import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite' // 引入 loadEnv
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 修改导出方式以获取 mode
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 添加这个简单的插件来替换 HTML 中的标题
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${env.VITE_SITE_TITLE || '猫猫导航'}</title>`
          )
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
