import { Dispatch } from "redux";
import axios from "axios";
import {
  LOGIN_API_ENDPOINT,
  SIGNUP_API_ENDPOINT,
  GET_USER_API_ENDPOINT,
} from "../../services/userApis";
import { createAlert, AlertActions } from "./alertActions";
export interface User {
  name: string;
  email: string;
}

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const FAILURE = "FAILURE";

interface LoginAction {
  type: typeof LOGIN;
  payload: {
    user: User;
    token: string;
  };
}

interface SignupAction {
  type: typeof SIGNUP;
  payload: {
    user: User;
    token: string;
  };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface GetUserAction {
  type: typeof GET_USER;
  payload: {
    user: User;
    token: string;
  };
}

interface FailureAction {
  type: typeof FAILURE;
  payload: Error;
}

export type AuthActionTypes =
  | LoginAction
  | SignupAction
  | LogoutAction
  | GetUserAction
  | FailureAction
  | AlertActions;

export const loginAsync =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.post(LOGIN_API_ENDPOINT, {
        email,
        password,
      });
      localStorage.setItem("token", response.data?.token);
      dispatch({
        type: LOGIN,
        payload: {
          user: { email, ...response.data.user },
          token: response.data?.token,
        },
      });
    } catch (error) {
      dispatch({ type: FAILURE, payload: error as Error });
    }
  };

export const signupUserAsync =
  ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      console.log(name, email, password);
      const response = await axios.post(SIGNUP_API_ENDPOINT, {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data?.token);
      dispatch({
        type: SIGNUP,
        payload: {
          user: { name, email },
          token: response.data?.token,
        },
      });
      dispatch(
        createAlert({ message: response.data?.message, type: "success" })
      );
    } catch (error) {
      dispatch({ type: FAILURE, payload: error as Error });
    }
  };

export const getUserAsync =
  () => async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem("token")!;
      const response = await axios.get(GET_USER_API_ENDPOINT, {
        headers: { "auth-token": token },
      });

      dispatch({
        type: GET_USER,
        payload: {
          user: response.data.user,
          token,
        },
      });
      dispatch(
        createAlert({ message: response.data?.message, type: "success" })
      );
    } catch (error) {
      dispatch({ type: FAILURE, payload: error as Error });
    }
  };

export const logOutUser = () => (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: LOGOUT });
};
