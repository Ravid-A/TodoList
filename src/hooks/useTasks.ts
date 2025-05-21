import { useCallback } from "react";
import type { Task, TaskFunction, UpdateTaskFunction } from "../types";
import useLocalStorage from "./useLocalStorage";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [nextId, setNextId] = useLocalStorage<number>("nextId", 1);

  const addTask = useCallback(
    (title: string) => {
      setTasks((prev) => [...prev, { id: nextId, title, completed: false }]);
      setNextId((id) => id + 1);
    },
    [nextId, setTasks, setNextId]
  );

  const toggleTask: TaskFunction = useCallback(
    (id: number) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask: TaskFunction = useCallback(
    (id: number) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const updateTaskTitle: UpdateTaskFunction = useCallback(
    (id: number, newTitle: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    },
    [setTasks]
  );

  return { tasks, addTask, toggleTask, deleteTask, updateTaskTitle };
}
