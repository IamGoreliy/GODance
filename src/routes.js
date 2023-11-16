import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import {LoginAdmin} from "./pages/AdminPage/LoginAdmin/LoginAdmin";
import {HomePage} from "./pages/HomePage/HomePage";
import {Gallery} from "./pages/BasisPage/HeaderNavButtonPages/Gallery/Gallery";
import {CalendarPage} from "./pages/BasisPage/HeaderNavButtonPages/CalendarPage/CalendarPage";
import {Chat} from "./pages/BasisPage/HeaderNavButtonPages/Chat/Chat";
import {StyleDancePage} from "./pages/dancingPage/StyleDancePage/StyleDancePage";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/oksanaAdmin',
                element: <LoginAdmin/>,
            },
            {
                path: '/adminCabinet',
                element:
            },
            {
                path: '/gallery',
                element: <Gallery/>,
            },
            {
                path: '/calendar',
                element: <CalendarPage/>,
            },
            {
                path: '/chat',
                element: <Chat/>,
            },
            {
                path: '/hip-hop',
                element: <StyleDancePage dependence={{title: 'Hip-hop'}}/>,
            },
            {
                path: '/dance-hall',
                element: <StyleDancePage dependence={{title: 'Dance-hall'}}/>,
            },
            {
                path: '/High-Heel',
                element: <StyleDancePage dependence={{title: 'High-Hell'}}/>,
            },
            {
                path: '/reggaeton',
                element: <StyleDancePage dependence={{title: 'Reggaeton'}}/>,
            },
            {
                path: '/jazz-funk',
                element: <StyleDancePage dependence={{title: 'Jazz-Funk'}}/>,
            },
            {
                path: '/twerk',
                element: <StyleDancePage dependence={{title: 'Twerk'}}/>,
            },
        ],
    }
])