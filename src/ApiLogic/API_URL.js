// export
const PROD_URL = 'https://followup-back.herokuapp.com';
const BASE_URL = PROD_URL;

export const APP_APIS = {
  BASE_URL: BASE_URL,
  SEND_OTP: BASE_URL + '/send_otp',
  LOGIN: BASE_URL + '/login',
  REGISTER: BASE_URL + '/registration',
  CHECK_USERNAME: BASE_URL + '/user_exist',
  GET_USER_DETAILS: BASE_URL + '/get_user',
  LOGOUT: BASE_URL + '/logout',
  TEST: BASE_URL + '/test',

  // TIMELINE
  ALL_USERS: BASE_URL + '/all_users',
  ADD_PROJECT: BASE_URL + '/add_project',
  ALL_PROJECTS: BASE_URL + '/my_projects',
  GET_PROJECT_MEMBERS: BASE_URL + '/project_members',
  ALL_MEMBERS: BASE_URL + '/all_members',
  ADD_MEMBERS: BASE_URL + '/add_member',
  PROJECT_REQUESTS: BASE_URL + '/requests',
  REQUEST_ACCEPT: BASE_URL + '/accept',
  GET_POSTS: BASE_URL + '/get_posts',
  ADD_POSTS: BASE_URL + '/add_posts',
  PROJECT_DATES: BASE_URL + '/project_dates',
  UPDATE_COMMENTS: BASE_URL + '/update_comments',
  COMMENTS_BY_MONTH: BASE_URL + '/comments_by_date',
  GET_CHATS: BASE_URL + '/get_chat',
  ADD_CHATS: BASE_URL + '/add_chat',
};
export const API_TYPE = {
  POST: 'POST',
  GET: 'GET',
};
