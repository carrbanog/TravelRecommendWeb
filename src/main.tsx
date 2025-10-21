import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./app/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // </StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
