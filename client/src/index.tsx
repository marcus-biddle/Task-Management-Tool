import React from 'react';
import './index.css';
import App from './App';
import { TodoProvider } from './hooks/contexts/provider';
import { Sidebar } from '../../clientside/src/components/Sidebar';
import TaskOptions from './components/TaskOptions';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from '../../clientside/src/components/Error';
import { Server } from './pages/Server';

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
        path: '/servers/:serverId',
        element: <Server />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
);
