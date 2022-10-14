// export
const PROD_URL = 'https://followup-back.herokuapp.com';
const DEV_URL = 'https://memofac.devclub.co.in/api';
const BASE_URL = PROD_URL;

export const APP_APIS = {
  BASE_URL: BASE_URL,
  SEND_OTP: BASE_URL + '/send_otp',
  LOGIN: BASE_URL + '/login',
  REGISTER: BASE_URL + '/registration',
  CHECK_USERNAME: BASE_URL + '/user_exist',

  LOGOUT: BASE_URL + '/logout',

  // TIMELINE
  ALL_USERS: BASE_URL + '/all_users',
  ADD_PROJECT: BASE_URL + '/add_project',
  ALL_PROJECTS: BASE_URL + '/my_projects',
};
export const API_TYPE = {
  POST: 'POST',
  GET: 'GET',
};
