import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Box from "@mui/material/Box";
import { useThemeMode } from "../../context/ThemeContext";
import { useTasks } from "../../context/TaskContext";
import type { HeaderProps } from "../../types/common";
import { STATUS } from "../../constants/task";

export default function Header({ onAddTask }: HeaderProps) {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === STATUS.completed,
  ).length;
  const pendingTasks = tasks.length - completedTasks;

  const ShowCount = ({
    label,
    count,
    color,
  }: {
    label: string;
    count: number;
    color?: string;
  }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      {color && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: color,
            mr: 0.5,
          }}
        />
      )}
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2" fontWeight={600} color="text.primary">
        {count}
      </Typography>
    </Stack>
  );

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
          Task Dashboard
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{
            flex: 1,
            justifyContent: "center",
            display: { xs: "none", md: "flex" },
          }}
        >
          <ShowCount label="Total" count={totalTasks} />
          <ShowCount
            label="Pending"
            count={pendingTasks}
            color="warning.main"
          />
          <ShowCount
            label="Completed"
            count={completedTasks}
            color="success.main"
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flex: 1, justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddTask}
            sx={{
              borderRadius: 2,
              bgcolor: "text.primary",
              color: "background.paper",
              "&:hover": { bgcolor: "text.secondary" },
            }}
          >
            Add Task
          </Button>
          <IconButton onClick={toggleThemeMode}>
            {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
