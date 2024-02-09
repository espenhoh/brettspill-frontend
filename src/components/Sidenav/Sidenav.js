import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import styles from "./Sidenav.module.css";

const checkActive = (navData) => navData.isActive ? styles.active : '';

const Sidenav = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(authActions.loggingOut());
  };

  return (
    <div className={styles.sidenav}>
      <ul>
        {isAuthenticated && (
          <React.Fragment>
            <li>
              <span>Innlogget som:</span>
              <br />
              request.user
            </li>
            <li>
              <NavLink className={checkActive} to="/spill">
                Spilliste
              </NavLink>
            </li>
            <li>
              <NavLink className={checkActive} to="/lag_spill">
                Lag spill
              </NavLink>
            </li>
            <li>
              <NavLink className={checkActive} to="/"  onClick={logoutHandler}>
                Logg ut
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {!isAuthenticated && (
          <React.Fragment>
            <li>
              <NavLink className={checkActive} to="/register">
                Registrer deg
              </NavLink>
            </li>
            <li>
              <NavLink className={checkActive} to="/login">
                Logg inn
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Sidenav;
