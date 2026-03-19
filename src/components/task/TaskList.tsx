import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TaskCard from "./TaskCard";
import TaskRow from "./TaskRow";
import EmptyState from "../common/EmptyState";
import type { TaskListProps } from "../../types/task";
import { VIEW_MODE, PRIORITY } from "../../constants/task";
import { useTasks } from "../../context/TaskContext";
import { useTaskFilter } from "../../context/TaskFilterContext";
import { useMemo } from "react";

export default function TaskList({
  view,
  onEdit,
  onDeleteRequest,
}: TaskListProps) {
  const { tasks } = useTasks();
  const { search, statusFilter, priorityFilter } = useTaskFilter();

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "All" || task.status === statusFilter;
        const matchesPriority =
          priorityFilter === PRIORITY.all || task.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      }),
    [tasks, search, statusFilter, priorityFilter],
  );

  if (filteredTasks.length === 0) {
    return (
      <EmptyState message="No tasks found. Add a new task to get started." />
    );
  }

  if (view === VIEW_MODE.grid) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gridAutoRows: "max-content",
          gap: 2,
          flex: 1,
          alignItems: "start",
          overflowY: "auto",
          p: 0.5,
        }}
      >
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 2, flex: 1, overflowY: "auto" }}
    >
      <Table stickyHeader sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                Priority
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                Due Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                Status
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" fontWeight={600}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((task) => (
            <TaskRow
              key={task.id}
              taskId={task.id}
              onEdit={onEdit}
              onDeleteRequest={onDeleteRequest}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
