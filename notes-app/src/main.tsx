import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArchivedPage from "./pages/ArchivedPage.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import NotFound from "./pages/404.tsx";
import { NotesProvider } from "./context/Notes.tsx";

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
    <NotesProvider>
      <RouterProvider router={router} />
    </NotesProvider>
  </StrictMode>
);
