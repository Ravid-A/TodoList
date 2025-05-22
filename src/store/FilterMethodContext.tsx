/* eslint-disable react-refresh/only-export-components */
import type { BasicProvider, FilterMethod } from "@/types";
import { createContext, useContext, useState } from "react";

export const filterMethodContext = createContext<FilterMethod | undefined>(
  undefined
);
export const setFilterMethodContext = createContext<
  React.Dispatch<React.SetStateAction<FilterMethod>> | undefined
>(undefined);

const FilterMethodProvider: React.FC<BasicProvider> = ({ children }) => {
  const [filterMethod, setFilterMethod] = useState<FilterMethod>("all");

  return (
    <filterMethodContext.Provider value={filterMethod}>
      <setFilterMethodContext.Provider value={setFilterMethod}>
        {children}
      </setFilterMethodContext.Provider>
    </filterMethodContext.Provider>
  );
};

export const useFilterMethod = () => {
  const context = useContext(filterMethodContext);
  if (context === undefined) {
    throw new Error(
      "useFilterMethod must be used within a FilterMethodProvider"
    );
  }
  return context;
};

export const useSetFilterMethod = () => {
  const context = useContext(setFilterMethodContext);
  if (context === undefined) {
    throw new Error(
      "useSetFilterMethod must be used within a FilterMethodProvider"
    );
  }
  return context;
};

export default FilterMethodProvider;
