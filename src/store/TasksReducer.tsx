/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useContext, useReducer } from "react";
import {
  type TaskState,
  type TaskAction,
  type TasksUtils,
  type BasicProvider,
  type TTaskStatus,
  type Task,
} from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";

export const tasksContext = createContext<Task[] | undefined>(undefined);
export const tasksUtilsContext = createContext<TasksUtils | undefined>(
  undefined
);

const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        tasks: [
          ...state.tasks,
          {
            id: state.nextId,
            title: action.title,
            status: action.status,
            timestamp: Date.now(),
          },
        ],
        nextId: state.nextId + 1,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, title: action.title, status: action.status }
            : task
        ),
      };
    case "DELETE_ALL_TASKS":
      return {
        ...state,
        tasks: [],
      };
  }
};

const TasksProvider: React.FC<BasicProvider> = ({ children }) => {
  const [savedState, saveState] = useLocalStorage<TaskState>("data", {
    tasks: [],
    nextId: 1,
  });

  const [state, dispatch] = useReducer(
    (prevState: TaskState, action: TaskAction): TaskState => {
      const newState = tasksReducer(prevState, action);
      saveState(newState);
      return newState;
    },
    savedState
  );

  const tasksUtils: TasksUtils = {
    addTask: useCallback((title: string, status: TTaskStatus) => {
      dispatch({ type: "ADD_TASK", title, status });
    }, []),
    deleteTask: useCallback((id: number) => {
      dispatch({ type: "DELETE_TASK", id });
    }, []),
    updateTask: useCallback(
      (id: number, title: string, status: TTaskStatus) => {
        dispatch({ type: "UPDATE_TASK", id, title, status });
      },
      []
    ),
    deleteAllTasks: useCallback(() => {
      dispatch({ type: "DELETE_ALL_TASKS" });
    }, []),
  };

  return (
    <tasksContext.Provider value={state.tasks}>
      <tasksUtilsContext.Provider value={tasksUtils}>
        {children}
      </tasksUtilsContext.Provider>
    </tasksContext.Provider>
  );
};

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

export default TasksProvider;
