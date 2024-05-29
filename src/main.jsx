import ReactDOM from 'react-dom/client'
import Login from './page1logsign/Login.jsx'
import Page2 from './page2/Page2.jsx'
import LikedMusic from './page2/LikedMusic.jsx'
import UserSettings from './page2/UserSettings.jsx'
import Pop from './page2/Pop.jsx'
import Rap from './page2/Rap.jsx'
import Rock from './page2/Rock.jsx'
import Indie from './page2/Indie.jsx'
import Classical from './page2/Classical.jsx'
import Azerbaijan from './page2/Azerbaijan.jsx'

import './page1logsign/style.css'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import {AuthProvider} from "./Auth/AuthContext.jsx";
import Username from "./Username/Username.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";



const router = createBrowserRouter(    [
    {
        index:true,
        element: <Navigate to="/login"/>
    },

    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/main",
        element: <PrivateRoute> <Page2 /> </PrivateRoute>,
    },
    {
        path:"/username",
        element: <PrivateRoute> <Username /> </PrivateRoute>,
    },
    {
        path:"/likedmusic",
        element: <PrivateRoute> <LikedMusic /> </PrivateRoute>,
    },
    {
        path:"/usersettings",
        element: <PrivateRoute> <UserSettings /> </PrivateRoute>,
    },
    {
        path:"/pop",
        element: <PrivateRoute> <Pop /> </PrivateRoute>,
    },
    {
        path:"/rap",
        element: <PrivateRoute> <Rap /> </PrivateRoute>,
    },
    {
        path:"/rock",
        element: <PrivateRoute> <Rock /> </PrivateRoute>,
    },
    {
        path:"/indie",
        element: <PrivateRoute> <Indie /> </PrivateRoute>,
    },
    {
        path:"/classical",
        element: <PrivateRoute> <Classical /> </PrivateRoute>,
    },
    {
        path:"/azerbaijan",
        element: <PrivateRoute> <Azerbaijan /> </PrivateRoute>,
    },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
