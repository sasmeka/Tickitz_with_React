import React from "react";
import logo from '../assets/img/logo.png'
import background from '../assets/img/background.png'

function Background() {
    return (
        <div className="hidden md:block md:col-span-3 md:relative">
            <img className="h-full w-full object-cover" src={background} alt="" />
            <div className="absolute top-0 h-full w-full bg-[#5F2EEA] bg-opacity-50 grid grid-col-1 justify-center items-center">
                <div className="flex w-full justify-around self-end relative -mb-5">
                    <img className="w-5/6" src={logo} alt="" /></div>
                <p className="text-center self-start sm:text-xl md:text-3xl text-white leading-none">wait, watch, wow!</p>
            </div>
        </div>
    )
}

export default Background