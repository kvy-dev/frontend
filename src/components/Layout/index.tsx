import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import styles from './styles.module.scss';
import Auth from "pages/Auth";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const Layout = () => {
    const isLoggedIn = useSelector((state: any) => state.user) || localStorage.getItem('kyv_access_token');

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.main}>
                    <Suspense fallback={<Loader />}>
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