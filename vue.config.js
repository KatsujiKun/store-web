module.exports = {
  lintOnSave: false,
  // 多页配置
  pages: {
    index: {
      // 配置html的模板页面
      template: 'public/index.html',

      // 配置Vue实例入口文件
      entry: 'src/index.js'
    }
  },
  // 配置服务器自动打开浏览器并运行项目
  // 因为服务器由webpack-dev-server来启动
  devServer: {
    // 设置自动打开默认浏览器
    open: true,
    proxy: {
      '/apis': {
        target: 'http://www.shuiyue.info:12600',
        pathRewrite: { '/apis': '' }
      }
    }
  }
}
