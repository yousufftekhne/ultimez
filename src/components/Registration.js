import axios from "axios";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constants";

const Registration = () => {
  // react hooks and form validating
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // navigation
  const navigate = useNavigate();
  const [resError, setResError] = useState();
  // submitting registration data
  const userRegistration = (data) => {
    // console.log(data);
    // converting data to JSON
    let formData = JSON.stringify(data);
    // api post request
    axios({
      method: "post",
      url: API_BASE_URL + "register",
      headers: {
        api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
        "Content-Type": "application/json",
      },
      data: formData,
    })
      .then((response) => {
        console.log(response);
        // if response is successfull else for fail
        if (response?.data?.status) {
          navigate(`/`);
        } else {
          let err = response?.data?.message;
          Object.keys(err).map((key) => setResError(err[key]));
        }
      })
      .catch((errors) => console.log(errors));
  };
  return (
    <Fragment>
      <div className="loginCon">
        <h2>Registration</h2>
        <p>create your company accounts</p>
        <form
          className="lcContainer"
          method="post"
          onSubmit={handleSubmit(userRegistration)}
        >
          {/* register full name */}
          <div className="formControl">
            <input
              type="text"
              className="inpForm"
              placeholder="Full Name *"
              {...register("full_name", { required: true })}
            />
            {errors.full_name?.type === "required" && (
              <p className="inpErr">Please enter Your Full Name</p>
            )}
          </div>
          {/* register name */}
          <div className="formControl">
            <input
              type="text"
              className="inpForm"
              placeholder="User Name *"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className="inpErr">Please enter Your Name</p>
            )}
          </div>
          {/* register country */}
          <div className="formControl">
            <select
              name="func"
              className="inpForm"
              {...register("country_row_id", { required: true })}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="Canada">Canada</option>
            </select>
            {errors.country_row_id?.type === "required" && (
              <p className="inpErr">Please Select country</p>
            )}
          </div>
          {/* register mobile number */}
          <div className="formControl">
            <input
              type="number"
              className="inpForm"
              placeholder="Mobile Number *"
              {...register("mobile_number", {
                required: true,
                pattern: /[0-9]/,
                maxLength: 10,
                minLength: 10,
              })}
            />
            {errors.mobile_number?.type === "required" && (
              <p className="inpErr">Please Select Mobile Number</p>
            )}
            {errors.mobile?.type === "maxLength" && (
              <p className="inpErr">Max length of mobile number should be 10</p>
            )}
            {errors.mobile?.type === "minLength" && (
              <p className="inpErr">Please enter min 10 numbers</p>
            )}
          </div>
          {/* register email id */}
          <div className="formControl">
            <input
              className="inpForm"
              placeholder="Email ID *"
              {...register("email_id", {
                required: "Email Address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              aria-invalid={errors.email_id ? "true" : "false"}
            />
            {errors.email_id && (
              <p className="inpErr" role="alert">
                {errors.email_id?.message}
              </p>
            )}
          </div>
          {/* register password */}
          <div className="formControl">
            <input
              type="password"
              className="inpForm"
              placeholder="Password *"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <p className="inpErr" role="alert">
                Please enter password
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="inpErr" role="alert">
                Password should have atleast 6 characters
              </p>
            )}
          </div>
          {/* register Referral ID */}
          <div className="formControl">
            <input
              type="number"
              className="inpForm"
              placeholder="Referral ID"
              {...register("referral_id", { required: false })}
            />
          </div>
          {/* mapping errors */}
          <div className="resError">
            <p className="inpErr">{resError}</p>
          </div>
          <button className="btn">Sign in</button>
          <p>
            Already have an account <NavLink to="/">Login</NavLink>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Registration;
