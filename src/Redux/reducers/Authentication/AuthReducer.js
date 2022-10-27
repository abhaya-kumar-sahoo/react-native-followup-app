const SET_USER_DETAILS = 'SET_USER_DETAILS';
const GET_TOKEN = 'GET_TOKEN';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';

const PROCEED_STATUS = 'PROCEED_STATUS';
const SPLASHSCREEN = 'SPLASHSCREEN';

export const RestoreToken = token => {
  return {
    type: GET_TOKEN,
    token,
  };
};

export const getUserDetails = data => {
  return {
    type: GET_USER_DETAILS,
    data,
  };
};
export const setUserDetails = ({data}) => {
  return {
    type: SET_USER_DETAILS,
    data,
  };
};
export const saveProgress = ({proceedStatus}) => {
  return {
    type: PROCEED_STATUS,
    data: proceedStatus,
  };
};

export const SplashLoading = ({loading}) => {
  return {
    type: SPLASHSCREEN,
    data: loading,
  };
};
const initialState = {
  loading: false,
  token: null,
  UserData: {},
  proceedStatus: 'login',
  SplashLoading: false,
};

export const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {...state, token: action.token};
    case GET_USER_DETAILS:
      return {...state, loading: true};
    case SET_USER_DETAILS:
      return {...state, UserData: action.data, loading: false};
    case PROCEED_STATUS:
      return {...state, proceedStatus: action.data};
    case SPLASHSCREEN:
      return {...state, SplashLoading: action.data};

    default:
      return {...state};
  }
};
