import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Checkout from "../../pages/Checkout/Checkout";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Orders from "../../pages/Orders/Orders";
import Signup from "../../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
                loader: ({ params }) => fetch(`https://genius-car-server-liart-eight.vercel.app/services/${params.id}`)
            },
            {
                path: '/orders',
                element: <Orders></Orders>
            }
        ]
    }
])
export default router