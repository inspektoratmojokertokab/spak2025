import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import Home from "./Home.tsx";
import Appreciation from "./Appreciation.tsx";
import Page404 from "./404.tsx";
import Result from "./Result.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capaian" element={<Result />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/:opd" element={<App />} />
          <Route path="/appreciation" element={<Appreciation />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
