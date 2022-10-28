module.exports={
    //继承其他规则
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ], // 继承 react 官方规则
    "env": {
      "browser": true,   //启用浏览器中的全局变量
      "es6": true,
      "node": true     //启用node中的全局变量
  },
    //解释选项
    parserOptions: {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      },
      babelOptions: {
        presets: [
          // 解决页面报错问题
          ["babel-preset-react-app", false],
          "babel-preset-react-app/prod",
        ],
      },
    },
    plugins: [
      "react"
    ],
    rules: {
      "react/jsx-uses-react": "error",  //不允许将React错误标记为未使用
      "react/jsx-uses-vars": "error",   //禁止将JSX中使用的变量错误标记为未使用
    }

}