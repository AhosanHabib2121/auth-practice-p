import {createBrowserRouter} from "react-router-dom";
import Root from "../mainLayout/Root";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import About from "../pages/about/About";
import PrivateRoutes from "../privateRoutes/PrivateRoutes";
import Order from "../pages/order/Order";

const myCreateRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/order',
                element: <PrivateRoutes><Order/></PrivateRoutes>
            }

        ]
    },
]);
            
export default myCreateRoutes;