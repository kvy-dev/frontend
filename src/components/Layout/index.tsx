import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import styles from './styles.module.scss';
import { Spin } from "antd";

const Layout = () => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.main}>
                <Suspense fallback={<Spin />}>
                    <>
                        <Outlet />
                    </>
                </Suspense>
                </div>
            </main>
        </div>
    )
}

export default Layout;