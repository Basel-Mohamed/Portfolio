import { createBrowserRouter } from "react-router";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Experience } from "../pages/Experience";
import { Projects } from "../pages/Projects";
import { Services } from "../pages/Services";
import { Contact } from "../pages/Contact";
import { Certifications } from '../pages/Certifications';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "experience",
        Component: Experience,
      },
      {
        path: "projects",
        Component: Projects,
      },
      {
        path: "certifications",
        Component: Certifications,
      },
      {
        path: "services",
        Component: Services,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
]);
