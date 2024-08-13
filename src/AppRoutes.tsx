import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Watch from "./pages/Watch";

const AppRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/watch/:video_id/:room_id?",
        element: <Watch />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
];

export default AppRoutes;