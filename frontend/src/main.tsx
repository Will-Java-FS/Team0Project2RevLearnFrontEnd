import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeToggle from "../src/components/ThemeToggle.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeToggle />
    <App />
  </StrictMode>,
);
