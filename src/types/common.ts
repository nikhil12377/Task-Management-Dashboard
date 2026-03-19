export interface HeaderProps {
  onAddTask: () => void;
}

export interface EmptyStateProps {
  message?: string;
}

export interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  primaryAction: () => void;
  secondaryAction: () => void;
  primaryActionText?: string;
  secondaryActionText?: string;
}
