//import 'core-js'  完整引入
//按需引入
// import 'core-js/es/promise'
import count from './js/count'
import {add} from "./js/math"
import './index.css'
import './css/index.less'

console.log(add(1,2))

console.log(count(8,4));

new Promise((resolve)=>{
    setTimeout(()=>{
        resolve()
    },1000)
})