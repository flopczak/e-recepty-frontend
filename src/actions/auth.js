import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISRER_FAIL,
  REGISTER_SUCCESS, GET_ERRORS,
} from "./types";


export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:8000/api/auth/user", tokenConfig(getState))
    .then((result) => {
      dispatch({ type: USER_LOADED, payload: result.data });
    })
    .catch((err) => {
      console.log("/api/auth/user error", err);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login = (pwz, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({pwz, password });
  axios
    .post("https://recepty.eu.ngrok.io/doctor/login", body, config)
    .then((res) => {
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const error = {
        msg: err.response.data,
        status: err.response.status
      }
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};

export const register = ({ pwz, password, name }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ pwz, password, name });
  console.log(body);
  axios
    .post("https://recepty.eu.ngrok.io/doctor/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const error = {
        msg: err.response.data,
        status: err.response.status
      }
      dispatch({
        type: REGISRER_FAIL,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};

export const logout = () => (dispatch) => {
  // axios
    // .post("http://localhost:8000/api/auth/logout/", null, tokenConfig(getState))
    // .then((result) => {
      dispatch({ type: LOGOUT_SUCCESS });
    // })
    // .catch((err) => {
    //   console.log("/api/auth/logout error", err);
    // });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};
