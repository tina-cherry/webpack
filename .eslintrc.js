module.exports={
    //继承其他规则
    extends:["eslint:recommended"],
    "env": {
        "browser": true,   //启用浏览器中的全局变量
        "es6": true,
        "node": true     //启用node中的全局变量
    },
    //解释选项
    parserOptions:{
        "ecmaVersion": 6, //es6语法
        "sourceType": "module",  //模块化
        "ecmaFeatures": {     //额外的语言特性:如果是react需要开启jsx
            "jsx": true
        }
    },

    //具体检查规则
    rules:{
        "no-var":2,  //不能使用var定义变量
    },


}