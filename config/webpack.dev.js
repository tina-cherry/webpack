const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    //入口文件
    entry:'./src/main.js',
    //输出
    output:{
        //__dirname node的变量，代表当前文件的文件夹目录
        path:path.resolve(__dirname,'dist'),  //绝对路径
        filename:'main.js',
        clean:true,  //在打包前将path的目录清空
       // assetModuleFilename: 'images/[hash][ext][query]'
    },
   //加载器
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']   //提取css成单独的文件，把style-loader改为MiniCssExtractPlugin.loader
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,'css-loader',"less-loader"]
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
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }

        ]
    },
    //插件
    plugins:[
        new ESLintPlugin({
            //检测哪些文件
            context:path.resolve(__dirname,'../src')
        }),
        new HtmlWebpackPlugin({
            //模版：以public文件下的index.html文件创建新的html文件
            //新的文件特点：1,结构和原来的一样，2.自动引入打包输出的资源
            template:path.resolve(__dirname,'../src/public/index.html')
        }),
        //将css提取到单独的问文件
        new MiniCssExtractPlugin()
    ],
    optimization: {
        minimizer: [
            //优化和压缩 CSS只在生产模式下生效
          new CssMinimizerPlugin(),
        ],
        minimize:true    //在开发模式下生效
    },
    //开发服务器:不会输出资源，在内存中编译打包的
    devServer:{
      host:"localhost",
      port:'3030',
      open:true
    },

   // mode 模式 ：development,production
   mode:"development"
}