export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskFunction = (id: number) => void;

export type UpdateTaskFunction = (id: number, newTitle: string) => void;

export interface TaskState {
  tasks: Task[];
  nextId: number;
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "UPDATE_TASK_TITLE"; payload: { id: number; title: string } };
