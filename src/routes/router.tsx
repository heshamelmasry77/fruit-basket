import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/routes/root/RootLayout";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
