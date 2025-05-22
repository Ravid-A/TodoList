import { useCallback, useReducer } from "react";
import {
  type TaskState,
  type TaskAction,
  type TasksUtils,
  type BasicProvider,
  type TTaskStatus,
} from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { tasksContext, tasksUtilsContext } from "./TasksContext";

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
            timestamp: new Date(),
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
  };

  return (
    <tasksContext.Provider value={state.tasks}>
      <tasksUtilsContext.Provider value={tasksUtils}>
        {children}
      </tasksUtilsContext.Provider>
    </tasksContext.Provider>
  );
};
export default TasksProvider;
