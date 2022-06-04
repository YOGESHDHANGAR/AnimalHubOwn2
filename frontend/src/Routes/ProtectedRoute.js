import React, { Fragment, useEffect } from "react";
// import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/signup" />;
            }

            // if (isAdmin === true && user.role !== "admin") {
            //   return (
            //     <Redirect
            //       to={{ path: "/signup", state: { from: props.location } }}
            //     />
            //   );
            // }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
