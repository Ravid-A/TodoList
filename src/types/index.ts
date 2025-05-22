import type { ReactNode } from "react";

export type Task = {
  id: number;
  title: string;
  status: TTaskStatus;
  timestamp: number;
};

export type TaskFunction = (id: number) => void;

export type UpdateTaskFunction = (id: number, newTitle: string) => void;

export interface TaskState {
  tasks: Task[];
  nextId: number;
}

export type SetLocalstorageValue<T> = (value: T | ((val: T) => T)) => void;

export type TaskAction =
  | { type: "ADD_TASK"; title: string; status: TTaskStatus }
  | { type: "DELETE_TASK"; id: number }
  | {
      type: "UPDATE_TASK";
      id: number;
      title: string;
      status: TTaskStatus;
    }
  | {
      type: "DELETE_ALL_TASKS";
    };

export type TasksUtils = {
  addTask: (title: string, status: TTaskStatus) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string, status: TTaskStatus) => void;
  deleteAllTasks: () => void;
};

export interface BasicProvider {
  children: ReactNode;
}

export const TaskStatus = {
  STATUS_NOT_COMPLETED: 0,
  STATUS_IN_PROGRESS: 1,
  STATUS_COMPLETED: 2,
};

export type TTaskStatus =
  | typeof TaskStatus.STATUS_NOT_COMPLETED
  | typeof TaskStatus.STATUS_IN_PROGRESS
  | typeof TaskStatus.STATUS_COMPLETED;

export const statusMap = {
  not_completed: TaskStatus.STATUS_NOT_COMPLETED,
  in_progress: TaskStatus.STATUS_IN_PROGRESS,
  completed: TaskStatus.STATUS_COMPLETED,
} as const;

export type FormTaskStatus = "not_completed" | "in_progress" | "completed";

export interface TaskFormValues {
  title: string;
  status: FormTaskStatus;
}

export type FilterMethod =
  | "all"
  | "completed"
  | "in_progress"
  | "not_completed";
export type SortMethod = "DESC" | "ASC";
