import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "./reducer";

const UserPage = props => {
  const { logoutClick, user } = props;
  if (!user.id) {
    return <Redirect to="/" />;
  }
  return (
    <div className="h100 w100 flex column align-items-center justify-center">
      <div className="flex">
        <img className="rounded mr1" src={user.imageUrl} />
        <h1>Welcome back {user.email}!</h1>
      </div>
      <div>
        <button className="btn bg-red white p1 rounded" onClick={logoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history;

  return {
    logoutClick() {
      dispatch(logout());
      history.push("/login");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
