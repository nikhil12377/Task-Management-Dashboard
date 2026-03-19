import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTasks } from "../../context/TaskContext";
import { DEFAULT_TASK, PRIORITY, STATUS, today } from "../../constants/task";
import type { Priority, Status, TaskFormProps } from "../../types/task";

export default function TaskForm({ open, editTaskId, onClose }: TaskFormProps) {
  const { addTask, editTask: editTaskContext, getTask } = useTasks();

  const [task, setTask] = useState(DEFAULT_TASK);

  useEffect(() => {
    const editTask = editTaskId ? getTask(editTaskId) : null;
    if (editTask) {
      setTask({
        title: editTask.title,
        description: editTask.description,
        priority: editTask.priority,
        status: editTask.status,
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : today,
      });
    } else {
      setTask(DEFAULT_TASK);
    }
  }, [editTaskId, open, getTask]);

  const handleChange = (field: keyof typeof DEFAULT_TASK, value: unknown) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!task.title.trim()) return;
    if (editTaskId) {
      editTaskContext(editTaskId, {
        title: task.title.trim(),
        description: task.description.trim(),
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
      });
    } else {
      addTask({
        title: task.title.trim(),
        description: task.description.trim(),
        priority: task.priority,
        dueDate: task.dueDate,
      });
    }
    onClose();
  };

  const isEdit = Boolean(editTaskId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack>
            <Typography variant="h6" fontWeight={700}>
              {isEdit ? "Edit Task" : "Add New Task"}
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Stack spacing={0.5}>
            <Typography variant="body2" fontWeight={500}>
              Title
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Task title"
              value={task.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="body2" fontWeight={500}>
              Description
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Task description"
              multiline
              rows={3}
              value={task.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={task.priority}
                label="Priority"
                onChange={(e) =>
                  handleChange("priority", e.target.value as Priority)
                }
              >
                <MenuItem value={PRIORITY.low}>Low</MenuItem>
                <MenuItem value={PRIORITY.medium}>Medium</MenuItem>
                <MenuItem value={PRIORITY.high}>High</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={task.status}
                label="Status"
                onChange={(e) =>
                  handleChange("status", e.target.value as Status)
                }
              >
                <MenuItem value={STATUS.pending}>Pending</MenuItem>
                <MenuItem value={STATUS.completed}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="body2" fontWeight={500}>
              Due Date
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={task.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: "background.paper",
            "&:hover": { bgcolor: "text.secondary" },
          }}
        >
          {isEdit ? "Save Changes" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
