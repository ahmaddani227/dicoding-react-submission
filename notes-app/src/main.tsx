import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArchivedPage from "./pages/ArchivedPage.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import NotFound from "./pages/404.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/archived",
    element: <ArchivedPage />,
  },
  {
    path: "/notes/:id",
    element: <DetailPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
