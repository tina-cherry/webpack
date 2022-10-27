module.exports = {
    presets:[
        [
          "@babel/preset-env",
          //设置corejs的自动按需引入
          {
            "useBuiltIns": "usage",
            "corejs": "3"
          }
        ]
    ],
}