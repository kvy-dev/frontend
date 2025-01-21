// /* eslint-disable react-refresh/only-export-components */
import React from "react";
import PathConstants from "./constants";

const SplashScreen = React.lazy(() => import("pages/SplashScreen"));

const routes = [
    { 
      path: PathConstants.BASE,
      element: <SplashScreen />,
    },
];

export default routes;