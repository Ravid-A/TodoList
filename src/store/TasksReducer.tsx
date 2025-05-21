import {
  useCallback,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from "react";
import type { ReactNode } from "react";

import type { TaskState, TaskAction, Task, TasksUtils } from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";

const tasksContext = createContext<Task[] | undefined>(undefined);
const tasksUtilsContext = createContext<TasksUtils | undefined>(undefined);

const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        tasks: [
          ...state.tasks,
          { id: state.nextId, title: action.title, completed: false },
        ],
        nextId: state.nextId + 1,
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "UPDATE_TASK_TITLE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, title: action.title } : task
        ),
      };
  }
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
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

  // Save state changes to localStorage
  useEffect(() => {
    saveState(savedState);
  }, [savedState, saveState]);

  const tasksUtils: TasksUtils = {
    addTask: useCallback((title: string) => {
      dispatch({ type: "ADD_TASK", title });
    }, []),

    toggleTask: useCallback((id: number) => {
      dispatch({ type: "TOGGLE_TASK", id });
    }, []),

    deleteTask: useCallback((id: number) => {
      dispatch({ type: "DELETE_TASK", id });
    }, []),

    updateTaskTitle: useCallback((id: number, title: string) => {
      dispatch({ type: "UPDATE_TASK_TITLE", id, title });
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

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(tasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTasksUtils = () => {
  const context = useContext(tasksUtilsContext);
  if (context === undefined) {
    throw new Error("useTasksUtils must be used within a TaskProvider");
  }
  return context;
};
