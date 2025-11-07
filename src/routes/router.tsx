import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/routes/root/RootLayout";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import ScanPage from "@/pages/ScanPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "scan", element: <ScanPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
