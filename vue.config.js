const name = 'my-element-admin'

module.exports = {
  // 取消每次eslint限制
  lintOnSave: false,
  publicPath: '/',
	
	configureWebpack: {
	  // provide the app's title in webpack's name field, so that
	  // it can be accessed in index.html to inject the correct title.
	  name: name,
	},
  // 文件指向简写设置
  chainWebpack: config => {

  },
  // 打包时不生成.map文件，减少体积增加打包速度
  productionSourceMap: false
  // 跨域设置
  // devServer: {
  //   proxy: 'http://locathost:4000'
  // }
}
