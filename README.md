# webpack_buckets
# webpack 局部安装方便于版本的更换 全局安装版本固定不方便 （建议局部安装）
# npx webpack  npx是去当前目录下的node_modules下的bin目录下找webpack软链接

# webpack4.x提出0配置0启动 （基本不可用，配置非常弱，还是需要自己配置 只是一个噱头）

<!-- https://github.com/postcss/postcss/blob/main/docs/README-cn.md -->


<!-- webpack-dev-server@3.11.0 启动本地服务-->
# 借助该服务进行打包 热更新、自动打开浏览器窗口 （dist文件会变空，存到内存中）
# 本地数据mock

<!-- babel js编译器 es6+ => es5  借助插件完成 presets预设插件  https://www.babeljs.cn/-->
# 对js语法支持的很好，默认支持js json
# flow->js  jsx->js  ts->js  
# polyfill 垫片 （包含ecma新特性的库） 
# 入口文件引入 文件体积过大，需要按需加载 配置文件配置
#  .babelrc 配置文件
