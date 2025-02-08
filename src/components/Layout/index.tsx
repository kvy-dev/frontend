import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import styles from './styles.module.scss';
import { Spin } from "antd";
import Auth from "pages/Auth";

const Layout = () => {
    const isLoggedIn = !false;

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.main}>
                    <Suspense fallback={<Spin />}>
                    <>
                    {
                        isLoggedIn ? <Outlet /> : <Auth />
                    }
                    </>
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

export default Layout;