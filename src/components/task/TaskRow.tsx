import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTasks } from "../../context/TaskContext";
import { PRIORITY, STATUS } from "../../constants/task";
import type { TaskRowProps } from "../../types/task";

export default function TaskRow({
  taskId,
  onEdit,
  onDeleteRequest,
}: TaskRowProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { updateStatus, getTask } = useTasks();

  const task = getTask(taskId);

  if (!task) return null;

  const isCompleted = task.status === STATUS.completed;

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const textSx = {
    textDecoration: isCompleted ? "line-through" : "none",
    color: isCompleted ? "text.secondary" : "text.primary",
  };

  const priorityChipSx =
    task.priority === PRIORITY.high
      ? { bgcolor: "error.main", color: "#fff" }
      : task.priority === PRIORITY.medium
        ? { bgcolor: "text.primary", color: "background.paper" }
        : { bgcolor: "info.main", color: "info.contrastText" };

  const handleMarkComplete = () => {
    updateStatus(task.id, STATUS.completed);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDeleteRequest(task.id);
    handleMenuClose();
  };

  const handleEdit = () => {
    onEdit(taskId);
    handleMenuClose();
  };

  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="body2" fontWeight={600} sx={textSx}>
          {task.title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {task.description}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip label={task.priority} size="small" sx={priorityChipSx} />
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={textSx}>
          {formattedDate}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={task.status}
          size="small"
          sx={{
            bgcolor:
              task.status === STATUS.completed
                ? "success.main"
                : "warning.main",
            color:
              task.status === STATUS.completed
                ? "success.contrastText"
                : "warning.contrastText",
            "& .MuiChip-label": { fontWeight: 500 },
          }}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleMarkComplete} disabled={isCompleted}>
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
            Mark Complete
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}
