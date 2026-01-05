import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Courses from "./pages/Courses"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Kodr from "./pages/Kodr";
import Codex from "./pages/Codex";
import AllCourses from "./pages/AllCourses";
import Footer from "./components/Footer";
import Layout from "./pages/Layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "about",
          element: <About />

        },
        {
          path: "contact",
          element: <Contact />

        },
        {
          path: "courses",
          element: <AllCourses />,
          children: [
            {
              index: true,
              element: <Courses />
            },
            {
              path: "kodr",
              element: <Kodr />

            },
            {
              path: "codex",
              element: <Codex />

            },
          ]

        }
      ],
    }
  ])
  return <RouterProvider router={router} />
}

export default App
