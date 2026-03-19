import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import type { ViewToggleProps } from "../../types/task";
import { VIEW_MODE } from "../../constants/task";

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <IconButton
        onClick={() => onChange(VIEW_MODE.grid)}
        color={view === VIEW_MODE.grid ? "primary" : "default"}
        size="small"
      >
        <GridViewIcon />
      </IconButton>
      <IconButton
        onClick={() => onChange(VIEW_MODE.list)}
        color={view === VIEW_MODE.list ? "primary" : "default"}
        size="small"
      >
        <ListIcon />
      </IconButton>
    </Stack>
  );
}
