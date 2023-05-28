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
        path: 'server/:serverId',
        element: <Server />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    // <TodoProvider>
      <RouterProvider router={router} />
    // </TodoProvider>
);
