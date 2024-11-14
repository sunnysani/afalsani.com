import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import ErrorBoundary from "./utils/routing/ErrorBoundary";
import CrashPage from "./pages/CrashPage";
import AppRouter from "./utils/routing/AppRouter";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={CrashPage}>
        <AppRouter />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
