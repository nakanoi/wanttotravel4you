import React from "react";

const Profile = ({ user, type, area, business }) => {
  return (
    <React.Fragment>
      <table className="profile-table">
        <tbody>
          {user !== null && (
            <tr>
              <th>Name</th>
              <td>{ user.username }</td>
            </tr>
          )}
          {type !== null && (
            <tr>
              <th>Type</th>
              <td>{ type }</td>
            </tr>
          )}
          {area !== null && (
            <tr>
              <th>Area</th>
              <td>{ area }</td>
            </tr>
          )}
          {business !== null && (
            <tr>
              <th>Business</th>
              <td>{ business }</td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Profile;
