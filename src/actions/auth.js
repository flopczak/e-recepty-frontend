import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISRER_FAIL,
  REGISTER_SUCCESS,
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

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ "email": username, password });

  axios
    .post("https://a8ec74f3c573.ngrok.io/login", body, config)
    .then((res) => {
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log(err);
    });
};

export const register = ({ username, password, email }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password, email });

  axios
    .post("https://7c98ca4d5f2c.ngrok.io/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISRER_FAIL,
      });
      console.log(err);
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/auth/logout/", null, tokenConfig(getState))
    .then((result) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      console.log("/api/auth/logout error", err);
    });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.access_token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
