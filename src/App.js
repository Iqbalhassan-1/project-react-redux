import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/AirlineOperator/Dashboard/Dashboard";
import EmissionReports from "./pages/AirlineOperator/EmissionReports/EmissionReports.jsx";
import HomeForAirlineOperator from "./pages/AirlineOperator/Home/HomeForAirlineOperator";
import SignIn from "./auth/SignIn/SignIn";
import ForgotPassword from "./auth/ForgotPassword/ForgotPassword";
import CreatePassword from "./auth/CreatePassword/CreatePassword";
import VerificationEmail from "./auth/ForgotPassword/VerificationEmail";
import VerifcationBodiesAo from "./pages/AirlineOperator/VerificationBodiesAo/VerificationBodiesAo";
import HomeForStateAgent from "./pages/StateAgent/Home/HomeForStateAgent.jsx";
import DashboardForStateAgent from "./pages/StateAgent/Dashboard/DashboardForStateAgent";
import EmissionReportSA from "./pages/StateAgent/EmissionReportSA/EmissionReportSA";
import Protected from "./config/Protected";
import SignInAo from "./auth/SignIn/SignInAo";
import HomeForVb from "./pages/VerificationBody/Home/HomeForVb";
import DashboardForVb from "./pages/VerificationBody/Dashboard/DashboardForVb";
import EmissionReportsVb from "./pages/VerificationBody/EmissionReportsVb/EmissionReportsVb";
import SignInVb from "./auth/SignIn/SignInVb";
import EmplanAo from "./pages/AirlineOperator/EmplanAo/EmplanAo";
import EmplanSa from "./pages/StateAgent/EmplanSa/EmplanSa";
import EmissionData from "./pages/AirlineOperator/EmissionData/EmissionData";
import NotFoundComponent from "./pages/NotFoundComponent";
import RoleMangement from "./pages/StateAgent/RoleManagement/RoleMangement";
import IcaoYearReport from "./pages/StateAgent/ICAO/IcaoYearReport";
import Unauth from "./components/Unauth";

const ROLES = {
  AO: "AO",
  VB: "VB",
  SA: "SA",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected allowedRoles={[ROLES.SA]} Component={HomeForStateAgent} />
    ),
    children: [
      {
        path: "/",
        element: <DashboardForStateAgent />,
      },
      {
        path: "/emplansa",
        element: <EmplanSa />,
      },
      {
        path: "/emissionsreports",
        element: <EmissionReportSA />,
      },
      // {
      //   path: "/activemp",
      //   element: <ActiveEmp />,
      // },
      {
        path: "/role",
        element: <RoleMangement />,
      },
      {
        path: "/icao",
        element: <IcaoYearReport />,
      },
    ],
  },
  {
    path: "/ao",
    element: (
      <Protected allowedRoles={[ROLES.AO]} Component={HomeForAirlineOperator} />
    ),
    children: [
      {
        path: "/ao",
        element: <Dashboard />,
      },
      {
        path: "/ao/EmissionMonitoringPlan",
        element: <EmplanAo />,
      },
      {
        path: "/ao/emissionreports",
        element: <EmissionReports />,
      },
      {
        path: "/ao/emissiondata",
        element: <EmissionData />,
      },

      {
        path: "/ao/verificationbodies",
        element: <VerifcationBodiesAo />,
      },
    ],
  },

  {
    path: "/vb",
    element: <Protected allowedRoles={[ROLES.VB]} Component={HomeForVb} />,

    children: [
      {
        path: "/vb",
        element: <DashboardForVb />,
      },

      {
        path: "/vb/emissionreports",
        element: <EmissionReportsVb />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signinao",
    element: <SignInAo />,
  },
  {
    path: "/signinvb",
    element: <SignInVb />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/createPassword",
    element: <CreatePassword />,
  },
  {
    path: "/verifyemail",
    element: <VerificationEmail />,
  },
  {
    path: "*",
    element: <NotFoundComponent />,
  },
  {
    path: "/unauthorized",
    element: <Unauth />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
