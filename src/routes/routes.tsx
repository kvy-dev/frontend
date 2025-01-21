// /* eslint-disable react-refresh/only-export-components */
// import React from "react";
import PathConstants from "./constants";
import QrCodeScanner from "@/components/QRScanner";

const routes = [
    { 
      path: PathConstants.BASE,
      element: <QrCodeScanner />,
    },
];

export default routes;