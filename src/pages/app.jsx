import React,{Suspense,lazy} from 'react'

import { Routes, Route, Link } from "react-router-dom"

//路由懒加载
const Home = lazy(()=>import(/*webpackChunkName:'home'*/'./home/home'))
const About = lazy(()=>import(/*webpackChunkName:'about'*/'./about/about'))


export default function App(){
    return <div>
        <div>react-Cli</div>
        <div><Link to="/home">Home</Link></div>
        <div><Link to="/about">About</Link></div>
        <Suspense fallback={<div>loading</div>}>
            <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            </Routes>
        </Suspense>
    </div>
}