import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import Home from "./pages/Home.jsx";
import Pastes from "./pages/Pastes.jsx";
import Paste from "./pages/Paste.jsx";
import NotFound from './pages/NotFound.jsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/pastes",
        element: <Pastes />
    },
    {
        path: "/pastes/:pasteId",
        element: <Paste />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <RouterProvider router={ router } />
        <Toaster />
    </Provider>
);
