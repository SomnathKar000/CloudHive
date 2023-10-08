import {
  LOGIN,
  LOGOUT,
  GET_USER,
  SIGNUP,
  FAILURE,
  User,
  AuthActionTypes,
} from "../actions/userActions";

interface userState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  error: Error | null;
}

export const initialState: userState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

export const userReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case FAILURE:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
