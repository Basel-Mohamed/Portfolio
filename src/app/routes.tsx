import { createBrowserRouter } from "react-router";
import { Layout } from "../components/layout/Layout";
import { ErrorBoundary } from "../components/layout/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        lazy: () => import("../pages/Home").then(m => ({ Component: m.Home })),
      },
      {
        path: "about",
        lazy: () => import("../pages/About").then(m => ({ Component: m.About })),
      },
      {
        path: "experience",
        lazy: () => import("../pages/Experience").then(m => ({ Component: m.Experience })),
      },
      {
        path: "projects",
        lazy: () => import("../pages/Projects").then(m => ({ Component: m.Projects })),
      },
      {
        path: "certifications",
        lazy: () => import("../pages/Certifications").then(m => ({ Component: m.Certifications })),
      },
      {
        path: "services",
        lazy: () => import("../pages/Services").then(m => ({ Component: m.Services })),
      },
      {
        path: "contact",
        lazy: () => import("../pages/Contact").then(m => ({ Component: m.Contact })),
      },
    ],
  },
  {
    path: "/admin/login",
    lazy: () => import("../pages/admin/Login").then(m => ({ Component: m.Login })),
  },
  {
    path: "/admin",
    lazy: () => import("../components/auth/ProtectedRoute").then(m => ({ Component: m.ProtectedRoute })),
    children: [
      {
        index: true,
        lazy: () => import("../pages/admin/Dashboard").then(m => ({ Component: m.Dashboard })),
      }
    ]
  }
]);
