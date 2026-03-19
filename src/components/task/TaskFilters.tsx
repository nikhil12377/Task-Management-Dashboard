import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FILTER, PRIORITY } from "../../constants/task";
import { useTaskFilter } from "../../context/TaskFilterContext";

export default function TaskFilters() {
  const { search, statusFilter, priorityFilter, setSearch, setStatusFilter, setPriorityFilter } =
    useTaskFilter();

  return (
    <Stack 
      direction={{ xs: "column", sm: "row" }} 
      spacing={2} 
      alignItems={{ xs: "stretch", sm: "center" }}
      sx={{ width: "100%", flex: 1 }}
    >
      <TextField
        size="small"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: { sm: 220 }, flex: { sm: 1 } }}
      />
      <Stack direction="row" spacing={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
        <Select
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: { sm: 140 }, flex: 1 }}
        >
          <MenuItem value={FILTER.all}>All Status</MenuItem>
          <MenuItem value={FILTER.pending}>Pending</MenuItem>
          <MenuItem value={FILTER.completed}>Completed</MenuItem>
        </Select>
        <Select
          size="small"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}
          sx={{ minWidth: { sm: 140 }, flex: 1 }}
        >
          <MenuItem value="All">All Priority</MenuItem>
          <MenuItem value={PRIORITY.low}>Low</MenuItem>
          <MenuItem value={PRIORITY.medium}>Medium</MenuItem>
          <MenuItem value={PRIORITY.high}>High</MenuItem>
        </Select>
      </Stack>
    </Stack>
  );
}
