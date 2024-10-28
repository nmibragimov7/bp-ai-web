import React from 'react';

import {classNames} from "@/shared/lib/classNames.ts";

import css from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({className}) => {
  return (
    <>
      <div className={classNames(css.Loader, className)}></div>
    </>
  );
};

export default Loader;