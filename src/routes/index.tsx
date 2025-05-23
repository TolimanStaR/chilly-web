import {createBrowserRouter, Navigate} from "react-router-dom";
import {App} from "@/App";
import {ForgotPassword, Home, Login, Profile, Register} from "@/pages";
import PrivateRoute from "@/components/navigation/ProtectedRoute.tsx";
import {
  CreatePlaceRequest,
  EditPlaceRequest,
  OrganizationInfo,
  OrganizationPlaces,
  PlaceRequests
} from "@/components/profile";
import {FAQ} from "@/pages/FAQ.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register/> },
      { path: 'forgot-password', element: <ForgotPassword/> },
      { path: 'faq', element: <FAQ/> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="info" replace /> },
          { path: "info", element: <OrganizationInfo /> },
          { path: "requests", element: <PlaceRequests /> },
          { path: "places", element: <OrganizationPlaces /> },
        ],
      },
      { path: "profile/requests/new", element: <CreatePlaceRequest/> },
      {
        path: "/profile/requests/edit/:id",
        element: <EditPlaceRequest />,
      }
    ],
  },
]);

export default router;
