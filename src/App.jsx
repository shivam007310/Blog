import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import conf from "./conf/conf";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally();
  }, []);
  return (
    <>
      <h1>Hi this app is working</h1>
    </>
  );
}

export default App;
