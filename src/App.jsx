import React, { useEffect, useState } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import conf from "./conf/conf";
import { Header, Footer } from "./components";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(conf.appWriteUrl);
    // console.log(import.meta.env.VITE_AS);
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen bg-gray-400 flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          TODO:
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
