let path = require("path")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const getStyleFn=(pre)=>{
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: "postcss-loader",   //处理样式的兼容性问题
            options: {
              postcssOptions: {
                plugins: [
                    "postcss-preset-env",
                ],
              },
            },
          },
        pre && {
            loader :pre,
            options:pre === 'less-loader' ?
            {
                lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                    modifyVars: {
                      'primary-color': '#1DA57A',
                       'link-color': '#1DA57A',
                      'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                },
            }
            :{}
        }
    ].filter(Boolean) 
}
module.exports={
    entry:'./src/main.js',
    output:{
        filename:'js/[name].bundle.js',
        path:path.resolve(__dirname,'../dist'),
        assetModuleFilename:'media/[hash:10][ext][query]',  //图片等资源
        clean:true,
    },
    module: {
        rules:[
            {
                oneOf: [
                    {
                      test: /\.css$/,
                      use: getStyleFn()
                    },
                    {
                      test: /\.less$/,
                      use: getStyleFn('less-loader')
                    }
                ]
            },
            {
               test: /\.(png|jpg|gif)$/i,
               type: 'asset',
               parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                }
              },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,  //排除node_modules
                use: {
                  loader: 'babel-loader',
                  options: {
                    plugins: ['react-refresh/babel'],
                    },
                },
               
            }
        ]
        

    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../src/public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[name].chunk.css",
        }),  //拆分css为单独文件
        new ESLintPlugin({
            //检测哪些文件
            context:path.resolve(__dirname,'../src'),
            cache:true,  //开启缓存
            cacheLocation:path.resolve(__dirname,'../node_modules/.cache/eslintcache'),  //eslint缓存文件
        }),
        new ReactRefreshWebpackPlugin(),  //react的热更新
          // 将public下面的资源复制到dist目录去（除了index.html）
        new CopyPlugin({
            patterns: [
            {
                from: path.resolve(__dirname, "../src/public"),
                to: path.resolve(__dirname, "../dist"),
                toType: "dir",
                noErrorOnMissing: true, // 不生成错误
                globOptions: {
                // 忽略文件
                ignore: ["**/index.html"],
                },
                info: {
                // 跳过terser压缩js
                minimized: true,
                },
            },
            ],
      }),
    ],
    //webpack解析模块加载选项
    resolve: {
        //自动补全文件扩展名
        extensions: [".jsx", ".js", ".json"],
    },
    optimization:{
        moduleIds: 'deterministic',  //解决文件内容不变，重复打包的问题
        minimizer:false, 
        minimizer: [
            //优化和压缩 CSS只在生产模式下生效
            new CssMinimizerPlugin(),
            //开启多进程以及压缩js
            new TerserPlugin({
                parallel:true,
            })
        ],
        splitChunks:{
            chunks:'all'
        },

    },
    mode:'development',
     //开发服务器:不会输出资源，在内存中编译打包的
    devServer:{
        host:"localhost",
        port:'3030',
        open:false,
        hot:true,  //开启HMR
        historyApiFallback: true, //解决前端路由404的问题
    },
    //打包文件和源文件作映射，方便定位问题
    devtool:'source-map'
}