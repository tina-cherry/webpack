
export default function count(...arg){
    return arg.reduce((pre,cur)=> pre + cur,0)
}

