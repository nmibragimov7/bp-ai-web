import React from 'react';

import {classNames} from "@/shared/lib/classNames.ts";

import menuIcon from "@/shared/assets/images/svg/menu.svg";
import downloadIcon from "@/shared/assets/images/svg/download.svg";

interface ControlProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  isLoading: boolean;
  onClick: () => void;
}

const Control: React.FC<ControlProps> = ({visible, setVisible, isLoading, onClick}) => {
  return (
    <>
      <div className={"fixed z-10 top-20 left-4 flex flex-col justify-center gap-4"}>
        <div
          className={"flex items-center justify-center cursor-pointer shadow-gray-500 rounded transition-all hover:bg-red/20 p-2"}
          onClick={() => setVisible(!visible)}
        >
          <img src={menuIcon} alt={"menu"} className={"w-6 h-6"}/>
        </div>
        <div
          className={classNames("flex items-center justify-center cursor-pointer shadow-gray-500 rounded transition-all hover:bg-red/20 p-2", {"opaciry-70": isLoading})}
          onClick={onClick}
        >
          <img src={downloadIcon} alt={"download"} className={"w-6 h-6"}/>
        </div>
      </div>
    </>
  );
};

export default Control;