import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import type { ConfirmationDialogProps } from "../../types/common";

export default function ConfirmationDialog({
  open,
  title,
  message,
  primaryAction,
  secondaryAction,
  primaryActionText = "Delete",
  secondaryActionText = "Cancel",
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={secondaryAction} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={secondaryAction}>{secondaryActionText}</Button>
        <Button onClick={primaryAction} color="error" variant="contained">
          {primaryActionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
