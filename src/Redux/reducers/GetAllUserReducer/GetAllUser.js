export const GET_ALL_USER = 'GET_ALL_USER';
export const SET_ALL_USER = 'SET_ALL_USER';

export const getAllUser = (token, data, text) => {
  return {
    type: GET_ALL_USER,
    data,
    token,
    text,
  };
};
export const setAllUser = ({data}) => {
  return {
    type: SET_ALL_USER,
    data,
  };
};

export const initialState = {
  loading: false,
  users: [],
};

export const GetAllUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {...state, loading: true};
    case SET_ALL_USER:
      return {...state, loading: false, users: action.data};
    default:
      return {...state};
  }
};
