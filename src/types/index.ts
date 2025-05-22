export type Task = {
  id: number;
  title: string;
  completed: boolean;
  timestamp: Date;
};

export type TaskFunction = (id: number) => void;

export type UpdateTaskFunction = (id: number, newTitle: string) => void;

export interface TaskState {
  tasks: Task[];
  nextId: number;
}

export type SetLocalstorageValue<T> = (value: T | ((val: T) => T)) => void;

export type TaskAction =
  | { type: "ADD_TASK"; title: string }
  | { type: "TOGGLE_TASK"; id: number }
  | { type: "DELETE_TASK"; id: number }
  | { type: "UPDATE_TASK_TITLE"; id: number; title: string };

export type TasksUtils = {
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTaskTitle: (id: number, title: string) => void;
};
