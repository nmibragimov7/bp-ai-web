import {Suspense} from "react";
import {Navigate, RouteObject, Outlet, createBrowserRouter} from "react-router-dom";

import Layout from "@/widgets/Layout/Layout.tsx";
import Fallback from "@/shared/ui/Fallback/Fallback.tsx";

import {MainLazy} from "@/pages/Main/Main.module.ts";
import {ProcessingLazy} from "@/pages/Processing/Processing.module.ts";

const pages: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Suspense fallback={<Fallback/>}>
          <Outlet/>
        </Suspense>
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <MainLazy/>,
      },
      {
        path: "processing",
        element: <ProcessingLazy/>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} replace={true}/>
  }
];

export const router = createBrowserRouter(pages);

