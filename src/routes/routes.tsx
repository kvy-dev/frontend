// /* eslint-disable react-refresh/only-export-components */
import React from "react";
import PathConstants from "./constants";
import BrokerDetails from "@/pages/BrokerDetails";
import BuilderProfile from "@/pages/BuilderProfile";

const BrokerDashboard = React.lazy(() => import('@/pages/BrokerDashboard'));
const Properties = React.lazy(() => import('@/pages/Properties'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const BuilderDashboard = React.lazy(() => import('@/pages/BuilderDashboard'));
const BrokerList = React.lazy(() => import('@/pages/BrokerList'));
const VisitHistory = React.lazy(() => import('@/pages/VisitHistory'));

const routes = localStorage.getItem('kvy_user_type') === 'broker' ? [
    { 
      path: PathConstants.BASE,
      element: <BrokerDashboard />
    },
    { 
      path: PathConstants.PROPERTIES,
      element: <Properties />
    },
    {
      path: PathConstants.PROFILE,
      element: <Profile />
    }
] : [
  { 
    path: PathConstants.BASE,
    element: <BuilderDashboard />
  },
  { 
    path: PathConstants.BROKERS,
    element: <BrokerList />
  },
  { 
    path: PathConstants.BROKER_DETAILS,
    element: <BrokerDetails />
  },
  { 
    path: PathConstants.PROPERTIES,
    element: <Properties />
  },
  { 
    path: PathConstants.VISIT_HISTORY,
    element: <VisitHistory />
  },
  { 
    path: PathConstants.PROFILE,
    element: <BuilderProfile />
  },
];

export default routes;