const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//用来获取处理样式的loader
function getStyleLoader(pre){
return [
    MiniCssExtractPlugin.loader,  //提取css成单独的文件，把style-loader改为MiniCssExtractPlugin.loader
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
                'postcss-preset-env',
            ],
          },
        },
    },
    pre
 ].filter(Boolean)   //过滤到为空的参数
}
module.exports = {
    //入口文件
    entry:'./src/main.js',
    //输出
    output:{
        //__dirname node的变量，代表当前文件的文件夹目录
        path:path.resolve(__dirname,'../dist'),  //绝对路径
        filename:'js/[name].[contenthash:10].js',    //入口文件打包输出文件名
        chunkFilename:'js/[name].[contenthash:10].chunk.js',
        clean:true,  //在打包前将path的目录清空
    },
   //加载器
    module:{
        rules:[
            {
                oneOf:[
                    {
                        test: /\.css$/,
                        use:getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader('less-loader')
                    },
                ]
            },
           
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset',
                parser:{
                    dataUrlCondition:{
                        // 小于1kb会转换成base64,优点减少请求数量，缺点：图片体积会大一点
                        maxSize: 1 * 1024 // 1kb
                    }
                },
                generator:{
                    //hash:10 取值前10
                    filename: 'images/[hash:10][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type:'asset/resource',
                generator:{
                    filename: 'media/[hash:10][ext][query]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,   //排除node_modules
                use: {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory:true,  //开启缓存
                    cacheCompression:false,  //关闭缓存文件的压缩
                    plugins: ['@babel/plugin-transform-runtime'],   //减少babel打包的体积，避免重复引入
                  }
                }
            }
        ]
    },
    //插件
    plugins:[
        //将css提取到单独的问文件
        new MiniCssExtractPlugin({
            filename:"css/[name].[contenthash:10].css",
            chunkFilename:'css/[name].[contenthash:10].chunk.css'
        }),
        new ESLintPlugin({
            //检测哪些文件
            context:path.resolve(__dirname,'../src'),
            cache:true,  //开启缓存
            cacheLocation:path.resolve(__dirname,'../node_modules/.cache/eslintcache'),  //eslint缓存文件
        }),
        new HtmlWebpackPlugin({
            //模版：以public文件下的index.html文件创建新的html文件
            //新的文件特点：1,结构和原来的一样，2.自动引入打包输出的资源
            template:path.resolve(__dirname,'../src/public/index.html')
        }),

      
    ],
    optimization: {
        moduleIds: 'deterministic',  //解决文件内容不变，重复打包的问题
        minimizer: [
            //优化和压缩 CSS只在生产模式下生效
            new CssMinimizerPlugin(),
            //开启多进程以及压缩js
            new TerserPlugin({
                parallel:true,
            })
        ],
        splitChunks:{
            chunks: 'all',  //对所有模块进行分割
            //修改配置
            cacheGroups: {},
        },
    },
    //开发服务器:不会输出资源，在内存中编译打包的
    devServer:{
      host:"localhost",
      port:'3030',
      open:true
    },
    devtool:'source-map',
   // mode 模式 ：development,production
   mode:"production"
}