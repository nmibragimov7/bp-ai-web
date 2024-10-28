import React from 'react';

import logo1Icon from "@/shared/assets/images/svg/logo-1.svg";
import logo2Icon from "@/shared/assets/images/svg/logo-2.svg";

const Logo: React.FC = () => {
    return (
        <>
            <a href={"/"} className={"flex flex-col md:flex-row items-center md:items-stretch gap-2 group"}>
                <img src={logo1Icon} alt={""} className={"w-6 h-6 md:w-8 md:h-8 shrink-0 transition-all duration-500 group-hover:rotate-[360deg]"}/>
                <div className={"flex items-center transition-all duration-500 border-b-2 border-red hover:border-white"}>
                  <img src={logo2Icon} alt={""} className={"w-[70px] md:w-[100px] h-auto"}/>
                </div>
            </a>
        </>
    );
};

export default Logo;