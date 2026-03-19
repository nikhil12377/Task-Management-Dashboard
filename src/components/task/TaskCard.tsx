import { useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTasks } from "../../context/TaskContext";
import { PRIORITY, STATUS } from "../../constants/task";
import type { TaskCardProps } from "../../types/task";

export default function TaskCard({
  task,
  onEdit,
  onDeleteRequest,
}: TaskCardProps) {
  const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(
    null,
  );
  const { updateStatus } = useTasks();

  const isCompleted = task.status === STATUS.completed;

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setOpenActionMenu(e.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenActionMenu(null);
  };

  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleMarkComplete = () => {
    updateStatus(task.id, STATUS.completed);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDeleteRequest(task.id);
    handleMenuClose();
  };

  const handleEdit = () => {
    onEdit(task.id);
    handleMenuClose();
  };

  const getPriorityChipSx = () => {
    switch (task.priority) {
      case PRIORITY.high:
        return { bgcolor: "error.main", color: "#fff" };
      case PRIORITY.medium:
        return { bgcolor: "text.primary", color: "background.paper" };
      default:
        return { bgcolor: "info.main", color: "info.contrastText" };
    }
  };

  const priorityChipSx = getPriorityChipSx();

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={1}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              textDecoration: isCompleted ? "line-through" : "none",
              color: isCompleted ? "text.secondary" : "text.primary",
            }}
          >
            {task.title}
          </Typography>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          sx={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {task.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={task.priority} size="small" sx={priorityChipSx} />
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
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CalendarTodayIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Menu
        anchorEl={openActionMenu}
        open={Boolean(openActionMenu)}
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
    </Card>
  );
}
