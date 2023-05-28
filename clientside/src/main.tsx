import './index.css';
import App from './App';
// import { TodoProvider } from './hooks/contexts/provider';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Server } from './pages/Server';
import { Sidebar } from './components/Sidebar';
import { ErrorPage } from './components/Error';
import { ServerProvider } from './hooks/contexts/ServerContext';
import { TaskProvider } from './hooks/contexts/TaskContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'servers/:id',
        element: <Server />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ServerProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </ServerProvider> 
);
