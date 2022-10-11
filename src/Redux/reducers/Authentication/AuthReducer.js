const USER_DETAILS = 'USER_DETAILS';
const GET_TOKEN = 'GET_TOKEN';
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
    type: USER_DETAILS,
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
};

export const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {...state, token: action.token};
    case USER_DETAILS:
      return {...state, UserData: action.data};
    case PROCEED_STATUS:
      return {...state, proceedStatus: action.data};
    case SPLASHSCREEN:
      return {...state, loading: action.data};

    default:
      return {...state};
  }
};
