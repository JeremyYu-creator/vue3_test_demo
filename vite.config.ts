import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    resolveExternalsPlugin({
      AMap: 'AMap'
    })
  ],
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
        additionalData:  `@import "${resolve(__dirname, 'src/assets/style/global.less')}";`,
        javascriptEnabled: true,
      }
    }
  },
  server:{
    port: 8888,
    open: false, //自动打开 
    base: "./ ", //生产环境路径
    proxy: { //配置接口的请求地址
      '/api': {
        // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
        target: 'https://randomuser.me',
        changeOrigin: true, // 是否改变域名：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: true, // 是否启用websockets
        rewrite: (path) => path.replace(/^\/api/, ""), 
      },
      '/v2' :{
        target: 'http://api.douban.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""), 
      },
      '/dfz' :{
        target: 'https://interface.sina.cn',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""), 
      },
    }
  }
})
