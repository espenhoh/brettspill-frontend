import React from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import styles from "./Sidenav.module.css";

import type { RootState } from "../../store/index";

const checkActive = (navData: NavLinkRenderProps) =>
  navData.isActive ? styles.active : "";

const Sidenav = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
              <NavLink className={checkActive} to="/" onClick={logoutHandler}>
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
            <li>
              <NavLink className={checkActive} to="/start_spill/oslo_conquest">
                Oslo Conquest
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Sidenav;
