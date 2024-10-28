import React, {PropsWithChildren} from 'react';

import Header from "@/widgets/Header/Header.tsx";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Header/>
      <div className={"min-h-screen container mx-auto flex flex-col pt-16 px-4 md:px-0"}>
        {children}
      </div>
    </>
  );
};

export default Layout;