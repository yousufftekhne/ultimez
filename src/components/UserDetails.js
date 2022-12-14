import { Fragment } from "react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  // fetching user values from redux
  const userData = useSelector((state) => state.userData.userValue);
  // console.log(userData);
  return (
    <Fragment>
      <div className="userTable">
        <div className="tableCenter">
          <table>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Username</th>
                <th>Country</th>
                <th>Email id</th>
                <th>Mobile number</th>
                <th>Referral id</th>
              </tr>
            </thead>
            {/* dynamic data after login */}
            <tbody>
              <tr>
                <td>{userData.full_name}</td>
                <td>{userData.username}</td>
                <td>{userData.country_row_id}</td>
                <td>{userData.email_id}</td>
                <td>{userData.mobile_number}</td>
                <td>{userData.referral_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDetails;
