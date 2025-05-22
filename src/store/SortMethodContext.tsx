/* eslint-disable react-refresh/only-export-components */
import type { BasicProvider, SortMethod } from "@/types";
import { createContext, useContext, useState } from "react";

export const sortMethodContext = createContext<SortMethod | undefined>(
  undefined
);
export const setSortMethodContext = createContext<
  React.Dispatch<React.SetStateAction<SortMethod>> | undefined
>(undefined);

const SortMethodProvider: React.FC<BasicProvider> = ({ children }) => {
  const [sortMethod, setSortMethod] = useState<SortMethod>("ASC");

  return (
    <sortMethodContext.Provider value={sortMethod}>
      <setSortMethodContext.Provider value={setSortMethod}>
        {children}
      </setSortMethodContext.Provider>
    </sortMethodContext.Provider>
  );
};

export const useSortMethod = () => {
  const context = useContext(sortMethodContext);
  if (context === undefined) {
    throw new Error("useSortMethod must be used within a SortMethodProvider");
  }
  return context;
};

export const useSetSortMethod = () => {
  const context = useContext(setSortMethodContext);
  if (context === undefined) {
    throw new Error(
      "useSetSortMethod must be used within a SortMethodProvider"
    );
  }
  return context;
};

export default SortMethodProvider;
