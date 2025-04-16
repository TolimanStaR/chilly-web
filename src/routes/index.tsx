import { createBrowserRouter } from "react-router-dom";
import {App} from "@/App";
import {ForgotPassword, Home, Login, Profile, Register} from "@/pages";
import PrivateRoute from "@/components/navigation/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register/> },
      { path: "profile", element: <PrivateRoute><Profile/></PrivateRoute>},
      { path: 'forgot-password', element: <ForgotPassword/> }
    ],
  },
]);

export default router;
