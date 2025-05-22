/* eslint-disable react-refresh/only-export-components */
import type { BasicProvider } from "@/types";
import { createContext, useContext, useState } from "react";

export const searchParameterContext = createContext<string | undefined>(
  undefined
);
export const setSearchParameterContext = createContext<
  React.Dispatch<React.SetStateAction<string>> | undefined
>(undefined);

const SearchParameterProvider: React.FC<BasicProvider> = ({ children }) => {
  const [searchParameter, setSearchParameter] = useState<string>("");

  return (
    <searchParameterContext.Provider value={searchParameter}>
      <setSearchParameterContext.Provider value={setSearchParameter}>
        {children}
      </setSearchParameterContext.Provider>
    </searchParameterContext.Provider>
  );
};

export const useSearchParameter = () => {
  const context = useContext(searchParameterContext);
  if (context === undefined) {
    throw new Error(
      "useSearchParameter must be used within a SearchParameterProvider"
    );
  }
  return context;
};

export const useSetSearchParameter = () => {
  const context = useContext(setSearchParameterContext);
  if (context === undefined) {
    throw new Error(
      "useSetSearchParameter must be used within a SearchParameterProvider"
    );
  }
  return context;
};

export default SearchParameterProvider;
