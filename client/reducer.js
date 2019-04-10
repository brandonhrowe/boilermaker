import axios from "axios";

const initialState = {};

const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

const setUser = user => ({
  type: SET_USER,
  user
});

const removeUser = () => ({
  type: REMOVE_USER
})

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

export const getUser = () => {
  return async dispatch => {
    try {
      let { data } = await axios.get("/auth/me");
      dispatch(setUser(data || initialState));
    } catch (err) {
      console.error(err);
    }
  };
};

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
