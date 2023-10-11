import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { alertReducer, AlertState } from "./reducers/alertReducer";
import { themeReducer, ThemeState } from "./reducers/themeReducer";
import { userReducer, userState } from "./reducers/userReducer";
import thunk from "redux-thunk";

export interface RootReducer {
  alert: AlertState;
  theme: ThemeState;
  auth: userState;
}

const rootReducer = combineReducers({
  alert: alertReducer,
  theme: themeReducer,
  auth: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
