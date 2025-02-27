// /* eslint-disable react-refresh/only-export-components */
import React from "react";
import PathConstants from "./constants";
import BrokerDetails from "@/pages/BrokerDetails";

const BrokerDashboard = React.lazy(() => import('@/pages/BrokerDashboard'));
const Properties = React.lazy(() => import('@/pages/Properties'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const BuilderDashboard = React.lazy(() => import('@/pages/BuilderDashboard'));
const BrokerList = React.lazy(() => import('@/pages/BrokerList'));
const VisitHistory = React.lazy(() => import('@/pages/VisitHistory'));
const BuilderProfile = React.lazy(() => import('@/pages/BuilderProfile'));
const Reports = React.lazy(() => import('@/pages/Reports'));

const routes = (condition: any) => condition ? [
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
{ 
  path: PathConstants.REPORTS,
  element: <Reports />
},
];

export default routes;