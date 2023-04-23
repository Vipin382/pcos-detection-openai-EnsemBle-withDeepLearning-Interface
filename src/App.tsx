import { useEffect, useState } from "react";
import Form from "./Form";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthWrapper from "./context/AuthWrapper";
import UserResult from "./UserResult";
import Landing from "./Landing";
import DlSolution from "./DlSolution";
import MlSolution from "./MlSolution";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Landing />
      ),
    },
    {
      path: "/dl",
      element: <DlSolution />,
    },
    {
      path: "/ml",
      element: <MlSolution />,
    },
    {
      path: "/user",
      element: (
        <AuthWrapper>
          <UserResult />
        </AuthWrapper>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
