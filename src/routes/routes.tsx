// /* eslint-disable react-refresh/only-export-components */
import React from "react";
import PathConstants from "./constants";

const BrokerDashboard = React.lazy(() => import('@/pages/BrokerDashboard'));
const Properties = React.lazy(() => import('@/pages/Properties'));

const routes = [
    { 
      path: PathConstants.BASE,
      element: <BrokerDashboard />
    },
    { 
      path: PathConstants.PROPERTIES,
      element: <Properties />
    },
];

export default routes;