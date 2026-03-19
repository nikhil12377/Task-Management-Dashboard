import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { FILTER, PRIORITY } from "../constants/task";
import type { Priority, TaskFilterContextType } from "../types/task";

const TaskFilterContext = createContext<TaskFilterContextType>({
  search: "",
  statusFilter: FILTER.all,
  priorityFilter: PRIORITY.all,
  setSearch: () => {},
  setStatusFilter: () => {},
  setPriorityFilter: () => {},
});

export const TaskFilterProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("taskFilter_search") || "";
  });
  const [statusFilter, setStatusFilter] = useState<string>(() => {
    return localStorage.getItem("taskFilter_status") || FILTER.all;
  });
  const [priorityFilter, setPriorityFilter] = useState<Priority>(() => {
    return (localStorage.getItem("taskFilter_priority") as Priority) || PRIORITY.all;
  });

  useEffect(() => {
    localStorage.setItem("taskFilter_search", search);
    localStorage.setItem("taskFilter_status", statusFilter);
    localStorage.setItem("taskFilter_priority", priorityFilter);
  }, [search, statusFilter, priorityFilter]);

  return (
    <TaskFilterContext.Provider
      value={{
        search,
        statusFilter,
        priorityFilter,
        setSearch,
        setStatusFilter,
        setPriorityFilter,
      }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
};

export const useTaskFilter = () => useContext(TaskFilterContext);
