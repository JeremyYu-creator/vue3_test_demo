import { defineConfig } from 'vite'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config'
// import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
// import svgBuilder from '@/src/utils/svgBuilder';
import svgBuilder from './src/utils/svgBuilder';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'happy-dom'
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   resolvers: [AntDesignVueResolver()],
    // }),
    // fix：会出现点击路由就重新加载依赖问题，因此查找了下解决方法，出现的主要原因是因为less的加载太慢了
    {
      ...Components ({
          resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
      }),
      apply: 'build'
    },
    // Components ({
    //     resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
    // }),
  // 开发环境动态加入ui库框架引入
  {
      name: 'dev-auto-import-antdv',
      transform(code, id) {
          if (/src\/main.js$/.test(id)) {
              let result = code.split('\n')
              // 解决首次加载isCustomElement的问题
              result.splice(result.length - 2, 0, `import Antd from 'ant-design-vue';import 'ant-design-vue/dist/antd.less';app.use(Antd);`)
              return {
                  code: result.join('\n'),
                  map: null
              }
          }
      },
      apply: 'serve'
  },
    resolveExternalsPlugin({
      AMap: 'AMap'
    }),
    svgBuilder('./src/assets/svg/')
  ],
  test: vitestConfig.test,
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, 'src/assets/style/global.less')}";`,
        javascriptEnabled: true,
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    open: true, //自动打开 
    // base: "./ ", //生产环境路径
    proxy: { //配置接口的请求地址
      // '/api': {
      //   // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
      //   target: 'https://randomuser.me',
      //   changeOrigin: true, // 是否改变域名：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      //   ws: true, // 是否启用websockets
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      '/mynode': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      '/v2': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      '/dfz': {
        target: 'https://interface.sina.cn',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      '/ent': {
        target: 'https://interface.sina.cn',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      '/api': {
        target: 'https://api.wmdb.tv',
        // target: 'http://api.douban.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      '/mock': {
        target: 'https://api.example.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
      // https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn  top50
      // https://api.wmdb.tv/movie/api?id=35240235  根据id查询电影详情
    }
  },
})
