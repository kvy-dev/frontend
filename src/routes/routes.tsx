// /* eslint-disable react-refresh/only-export-components */
import React from "react";
import PathConstants from "./constants";

const BrokerDashboard = React.lazy(() => import('@/pages/BrokerDashboard'));

const routes = [
    { 
      path: PathConstants.BASE,
      element: <BrokerDashboard />
    },
];

export default routes;