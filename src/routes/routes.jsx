import { createBrowserRouter, Link } from 'react-router-dom';
import App from '../App';
import Tasks from '../pages/Tasks';
import Chat from '../pages/Chat';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Archeive from '../pages/Archeive';
import PrivateRoutes from '../components/layouts/PrivateRoutes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes><App /></PrivateRoutes>,
    children: [
      {
        index: true,
        element: <Tasks />,
      },
      {
        path: '/archeive',
        element: <Archeive></Archeive>
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/signup",
    element: <Signup></Signup>
  },
  {
    path: "*",
    element: <div className='flex flex-col gap-3 justify-center items-center h-52'>
      <h1 className='text-2xl text-red-500'>Page not found</h1>
      <Link  to={'/'}> <button className='border rounded-md p-2'>Go to home</button> </Link>
    </div>
  }
]);

export default routes;
