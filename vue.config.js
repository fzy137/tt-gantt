module.exports = {

    //build目录
    assetsDir: 'static',
    outputDir:'dist',
    // publicPath:'./',

    devServer: {
      host:'0.0.0.0',
      hot:true,
      inline: false,
      port:8099,
      proxy: {
        '/apis': {
          target: 'http://xx.xx.xx.xx:8170/', 
          changeOrigin: true,
          ws: false,
          pathRewrite: {
            '^/apis': ''
          }
        }
      }
    },
    lintOnSave:false,
}
