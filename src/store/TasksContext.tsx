import { createContext, useContext } from "react";
import type { Task, TasksUtils } from "@/types";

export const tasksContext = createContext<Task[] | undefined>(undefined);
export const tasksUtilsContext = createContext<TasksUtils | undefined>(
  undefined
);

export const useTasks = () => {
  const context = useContext(tasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const useTasksUtils = () => {
  const context = useContext(tasksUtilsContext);
  if (context === undefined) {
    throw new Error("useTasksUtils must be used within a TaskProvider");
  }
  return context;
};
