import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";
import { TaskFilterProvider } from "./context/TaskFilterContext.tsx";
import { ThemeModeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <TaskFilterProvider>
        <ThemeModeProvider>
          <App />
        </ThemeModeProvider>
      </TaskFilterProvider>
    </TaskProvider>
  </StrictMode>,
);
