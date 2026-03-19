import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/Inbox";
import type { EmptyStateProps } from "../../types/common";

export default function EmptyState({
  message = "No tasks found.",
}: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
      <InboxIcon sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
}
