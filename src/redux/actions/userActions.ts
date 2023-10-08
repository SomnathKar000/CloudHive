import { Dispatch } from "redux";
import axios from "axios";
import {
  LOGIN_API_ENDPOINT,
  SIGNUP_API_ENDPOINT,
  GET_USER_API_ENDPOINT,
} from "../../services/userApis";

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
  | FailureAction;

export const loginAsync =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(LOGIN_API_ENDPOINT, {
        email,
        password,
      });
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
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(SIGNUP_API_ENDPOINT, {
        name,
        email,
        password,
      });
      dispatch({
        type: SIGNUP,
        payload: {
          user: { name, email },
          token: response.data?.token,
        },
      });
    } catch (error) {
      dispatch({ type: FAILURE, payload: error });
    }
  };

export const getUserAsync = (token: string) => async (dispatch: Dispatch) => {
  try {
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
  } catch (error) {
    dispatch({ type: FAILURE, payload: error });
  }
};
