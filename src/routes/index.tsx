import { createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import Layout from 'components/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <h1>404 Page Not Found</h1>,
    children: routes(localStorage.getItem('kvy_user_type') === 'broker'),
  }
]);

export default router;