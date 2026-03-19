import type { ReactNode } from "react";
import type { FILTER, PRIORITY, STATUS, VIEW_MODE } from "../constants/task";

export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];

export type Status = (typeof STATUS)[keyof typeof STATUS];

export type Filter = (typeof FILTER)[keyof typeof FILTER];

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
  createdAt: string;
}

export interface TaskContextType {
  tasks: Task[];
  filter: Filter;

  setFilter: (filter: Filter) => void;

  addTask: (task: Omit<Task, "id" | "status" | "createdAt">) => void;

  deleteTask: (id: string) => void;

  editTask: (id: string, updatedTask: Partial<Task>) => void;

  updateStatus: (id: string, status: Status) => void;

  getTask: (id: string) => Task | undefined;
}

export type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];

export interface TaskFormProps {
  open: boolean;
  editTaskId: string | null;
  onClose: () => void;
}

export interface TaskProviderProps {
  children: ReactNode;
}

export interface TaskFilterContextType {
  search: string;
  statusFilter: string;
  priorityFilter: Priority | "All";
  setSearch: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setPriorityFilter: (value: Priority | "All") => void;
}

export interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export interface TaskRowProps {
  taskId: string;
  onEdit: (taskId: string) => void;
  onDeleteRequest: (id: string) => void;
}

export interface TaskListProps {
  view: ViewMode;
  onEdit: (taskId: string) => void;
  onDeleteRequest: (id: string) => void;
}

export interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDeleteRequest: (id: string) => void;
}
