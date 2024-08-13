import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import UserApi from "./api/UserApi";

export default function App() {
  const [stores, setStores] = useState(useContext(Context));
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!window.location.pathname.includes("/signup") && !window.location.pathname.includes("/signin"))
    {
      if (localStorage.getItem('token') == null) {
        stores?.userStore.setIsAuth(false);
        window.location.pathname = "/signup";
        return;
      }
    }
    UserApi.auth()
      .then((res: any) => stores?.userStore.setUser(res.data))
      .catch();
  }, [])

  return (
    <>
      <Routes>
        {AppRoutes.map((route, index) => <Route key={index} {...route}/>)}
      </Routes>
    </>
  )
}