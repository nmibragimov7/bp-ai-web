import {useEffect, useRef} from 'react';

import {classNames} from "@/shared/lib/classNames";

const Fallback = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.classList.add("fallback--show");
    ref.current?.classList.remove("fallback--hide");
    return () => {
      setTimeout(() => {
        ref.current?.classList.remove("fallback--show");
        ref.current?.classList.add("fallback--hide");
      }, 1000);
    }
  }, []);

  return (
    <>
      <div ref={ref} className={classNames("w-full min-h-screen flex items-center justify-center")}>
        <img src={"/logo-web.svg"} alt="logo" className={"w-40 h-40"}/>
      </div>
    </>
  );
};

export default Fallback;
