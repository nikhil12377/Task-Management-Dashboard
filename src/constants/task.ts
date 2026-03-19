import type { Priority, Status } from "../types/task";

export const PRIORITY = {
  low: "Low",
  medium: "Medium",
  high: "High",
  all: "All",
} as const;

export const STATUS = {
  pending: "Pending",
  completed: "Completed",
} as const;

export const FILTER = {
  all: "All",
  ...STATUS,
} as const;

export const VIEW_MODE = {
  list: "List",
  grid: "Grid",
} as const;

export const today = new Date().toISOString().slice(0, 10);

export const DEFAULT_TASK = {
  title: "",
  description: "",
  priority: PRIORITY.medium as Priority,
  status: STATUS.pending as Status,
  dueDate: today,
};
