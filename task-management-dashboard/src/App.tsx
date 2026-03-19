import { useState } from "react";
import Stack from "@mui/material/Stack";
import Header from "./components/layout/Header";
import TaskFilters from "./components/task/TaskFilters";
import TaskList from "./components/task/TaskList";
import TaskForm from "./components/task/TaskForm";
import ViewToggle from "./components/task/ViewToggle";
import ConfirmationDialog from "./components/common/ConfirmationDialog";
import { useTasks } from "./context/TaskContext";
import { VIEW_MODE } from "./constants/task";
import type { ViewMode } from "./types/task";
import { Box } from "@mui/material";

export default function App() {
  const { deleteTask, getTask } = useTasks();

  const [view, setView] = useState<ViewMode>(VIEW_MODE.list);

  const [formOpen, setFormOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddTask = () => {
    setEditTaskId(null);
    setFormOpen(true);
  };

  const handleEdit = (taskId: string) => {
    setEditTaskId(taskId);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditTaskId(null);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) deleteTask(deleteId);
    setDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const deleteTaskData = getTask(deleteId ?? "");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header onAddTask={handleAddTask} />
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          mb={3}
          gap={2}
        >
          <TaskFilters />
          <Box sx={{ alignSelf: { xs: "flex-end", md: "auto" } }}>
            <ViewToggle view={view} onChange={setView} />
          </Box>
        </Stack>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TaskList
            view={view}
            onEdit={handleEdit}
            onDeleteRequest={handleDeleteRequest}
          />
        </Box>
      </Box>

      <TaskForm
        open={formOpen}
        editTaskId={editTaskId}
        onClose={handleFormClose}
      />

      <ConfirmationDialog
        open={deleteId !== null}
        title="Delete Task"
        message={`Are you sure you want to delete ${deleteTaskData?.title} task?`}
        primaryAction={handleDeleteConfirm}
        secondaryAction={handleDeleteCancel}
      />
    </Box>
  );
}
