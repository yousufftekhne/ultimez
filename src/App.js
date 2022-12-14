import "./App.css";
import { Fragment } from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/user" element={<UserDetails />} />
      </Routes>
    </Fragment>
  );
}

export default App;
