// /* eslint-disable react-refresh/only-export-components */
import React from "react";
import PathConstants from "./constants";

const BrokerDashboard = React.lazy(() => import('@/pages/BrokerDashboard'));
const Properties = React.lazy(() => import('@/pages/Properties'));
const Profile = React.lazy(() => import('@/pages/Profile'));

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
    element: <BrokerDashboard />
  },
];

export default routes;