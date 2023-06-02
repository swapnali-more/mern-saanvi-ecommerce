import { actionTypes } from "../../Utils/actionTypes";

const initialState = {
  userData: null,
  isLoading: false,
  error: null,
  message: "",
};

export const createUserReducer = (state = initialState, action: {type: any, payload: any}) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        userData: payload.data,
        message: "Registration requested!",
      };
    case actionTypes.CREATE_USER_SUCCESS:
      localStorage.setItem("profile", JSON.stringify(payload.data));
      return {
        ...state,
        userData: payload.data,
        isLoading: false,
        error: null,
        message: "Registration successful!",
      };
    case actionTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
        message: "Registration failed.",
      };
    default:
      return state;
  }
};
