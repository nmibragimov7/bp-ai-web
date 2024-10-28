import React, {PropsWithChildren} from 'react';

import {classNames} from "@/shared/lib/classNames.ts";

import closeIcon from "@/shared/assets/images/svg/close.svg";

interface SidebarProps extends PropsWithChildren {
  visible: boolean;
  setVisible: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({children, visible, setVisible}) => {
  return (
    <>
      <div
        className={classNames("transition-all fixed top-0 left-0 bottom-0 z-20 translate-x-[100vw] bg-white w-[400px] p-4", {"!translate-x-[calc(100vw-400px)] shadow-gray-500": visible})}>
        <div className={"flex items-center justify-between mb-8"}>
          <span
            className={"flex items-center justify-center cursor-pointer transition-all hover:opacity-70 p-4"}
            onClick={() => setVisible()}
          >
            <img src={closeIcon} alt="close" className={"w-4 h-4"}/>
          </span>
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;