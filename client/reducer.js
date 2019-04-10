import axios from "axios";

const initialState = { user: {} };

const SET_USER = "SET_USER";

const setUser = user => ({
  type: SET_USER,
  user
});

export const login = formData => {
  return async dispatch => {
    try {
      let { data } = await axios.put("/auth/login", formData);
      dispatch(setUser(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      await axios.delete("/auth/logout");
      dispatch(setUser(initialState.user));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getUser = () => {
  return async dispatch => {
    try {
      let { data } = await axios.get("/auth/me");
      dispatch(setUser(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const makeUser = formData => {
  return async dispatch => {
    try {
      let { data } = await axios.post("/auth/newuser", formData);
      dispatch(setUser(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
