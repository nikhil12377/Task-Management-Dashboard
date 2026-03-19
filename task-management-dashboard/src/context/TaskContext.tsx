import { createContext, useContext, useEffect, useState } from "react";

import type {
  Task,
  Filter,
  TaskContextType,
  TaskProviderProps,
} from "../types/task";
import { FILTER, STATUS } from "../constants/task";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  filter: FILTER.all,
  setFilter: () => {},
  addTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  updateStatus: () => {},
  getTask: () => undefined,
});

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localStorageData = localStorage.getItem("tasks");
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  const [filter, setFilter] = useState<Filter>(FILTER.all);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask: TaskContextType["addTask"] = (task) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      status: STATUS.pending,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask: TaskContextType["deleteTask"] = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask: TaskContextType["editTask"] = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
    );
  };

  const updateStatus: TaskContextType["updateStatus"] = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const getTask: TaskContextType["getTask"] = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const value: TaskContextType = {
    tasks,
    filter,
    setFilter,
    addTask,
    deleteTask,
    editTask,
    updateStatus,
    getTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
