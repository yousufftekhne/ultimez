import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constants";
import { userActions } from "../store/userData";

const Login = () => {
  // getting values of user Emai and password
  const userEmail = useRef("");
  const userPassword = useRef("");
  // validating and displaying the error meaages for user email and password
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [resError, setResError] = useState();
  const navigate = useNavigate();
  // passing data to redux
  const dispach = useDispatch();
  const userLogin = (event) => {
    // preventing reload of the page on submit
    event.preventDefault();
    // getting values of input boxes using ref attribute
    let userMail = userEmail.current.value;
    let userPass = userPassword.current.value;
    // email validation code
    let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // checking and setting validation of email and empty input
    if (userMail.trim().length === 0) {
      setUserError("Please enter Email ID");
    } else if (!userMail.trim().match(mailformat)) {
      setUserError("Please Enter Valid mail ID");
    } else {
      setUserError(false);
    }
    // checking for password validation
    if (userPass.trim().length === 0) {
      setPassError("Please enter Passowrd");
    } else {
      setPassError(false);
    }
    // using axios posting data and getting response
    axios({
      method: "post",
      url: API_BASE_URL + "login",
      headers: {
        api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        login_id: userMail,
        password: userPass,
      }),
    })
      .then(function (response) {
        // console.log(response);
        // checking for the response
        if (response?.data?.status) {
          setUserDetails(response?.data?.message);
          // sending data to redux
          dispach(userActions.addUserDetails(response?.data?.message));
          // after completing login navigating to user page to display data
          navigate("/user");
        } else {
          // mapping errors in console
          let err = response?.data?.message;
          Object.keys(err).map((key) => setResError(err[key]));
        }
      })
      .catch(function (error) {
        console.log(error?.data?.message);
      });
  };
  useEffect(() => {
    if (userDetails) {
      // passing data to redux
      dispach(userActions.addUserDetails(userDetails));
    }
  }, [userDetails, dispach]);
  return (
    <Fragment>
      <div className="loginCon">
        <h2>Login</h2>
        <p>Enter you account login details</p>
        <form className="lcContainer" method="post" onSubmit={userLogin}>
          {/* email id */}
          <div className="formControl">
            <input
              type="text"
              className="inpForm"
              ref={userEmail}
              placeholder="Email ID"
            />
            <p className="inpErr">{userError}</p>
          </div>
          {/* password */}
          <div className="formControl">
            <input
              type="password"
              className="inpForm"
              ref={userPassword}
              placeholder="password"
            />
            <p className="inpErr">{passError}</p>
          </div>
          {/* displaying response error */}
          <div className="resError">
            <p className="inpErr">{resError}</p>
          </div>
          <button className="btn">Sign in</button>
          <p>
            Dont have an account <NavLink to="/registration">Register</NavLink>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
