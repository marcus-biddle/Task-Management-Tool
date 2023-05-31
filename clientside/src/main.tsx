import './index.css';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { ServerPage } from './pages/Server';
import { Sidebar } from './components/Sidebar';
import { ErrorPage } from './components/Error';
import { ServerProvider } from './hooks/contexts/ServerContext';
import { TaskProvider } from './hooks/contexts/TaskContext';
import { UserProvider } from './hooks/contexts/UserContext';
import HomePage from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'servers/:id',
        element: <ServerPage />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <UserProvider>
    <ServerProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </ServerProvider>
  </UserProvider>
);
