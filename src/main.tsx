import "@ant-design/v5-patch-for-react-19";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import TasksProvider from "./store/TasksReducer";
import FilterMethodProvider from "./store/FilterMethodContext.tsx";
import SortMethodProvider from "./store/SortMethodContext.tsx";

import App from "./App.tsx";

import "./index.css";
import SearchParameterProvider from "./store/SearchParameterContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksProvider>
      <FilterMethodProvider>
        <SortMethodProvider>
          <SearchParameterProvider>
            <App />
          </SearchParameterProvider>
        </SortMethodProvider>
      </FilterMethodProvider>
    </TasksProvider>
  </StrictMode>
);
