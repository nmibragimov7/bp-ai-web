import {createRoot} from 'react-dom/client'
import {QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider} from "antd";

import App from './App.tsx'

import {queryClient} from "@/app/setup/query/queryClient.tsx";
import {antdTheme} from "@/app/setup/theme/theme.ts";

import "@/app/styles/globals.scss";
import "@/app/styles/rewrite.scss";
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <App/>
      </ConfigProvider>
    </QueryClientProvider>
  // </StrictMode>,
)
