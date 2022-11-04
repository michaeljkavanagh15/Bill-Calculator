
import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './routes/Dashboard';
import "./css/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';


// React Routing
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

