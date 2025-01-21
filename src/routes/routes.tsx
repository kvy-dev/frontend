// /* eslint-disable react-refresh/only-export-components */
import React from "react";
import PathConstants from "./constants";

const Auth = React.lazy(() => import("@/pages/Auth"));

const routes = [
    { 
      path: PathConstants.BASE,
      element: <Auth />,
    },
];

export default routes;