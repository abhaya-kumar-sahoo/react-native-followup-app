import {APP_APIS} from './API_URL';
import axios from 'axios';
export const aboardSignal = new AbortController();

export const request = async ({
  url,
  method = 'POST',
  headers = {'Content-Type': 'application/json'},
  body,
}) => {
  return await fetch(url, {
    method,
    headers,
    body,
    signal: aboardSignal.signal,
  }).then(response => response.json());
};

/**
 * Request Wrapper with default success/error actions
 */

const headerDefault = {'Content-Type': 'application/json'};

export const AxiosRequest = async function (
  options,
  isHeader = true,
  headersData = {...headerDefault},
) {
  let authHeader = null;

  if (isHeader) {
    // authHeader = await AsyncStorage.getItem("Auth"); /// Add header
  }
  let source = axios.CancelToken.source();

  const client = axios.create({
    baseURL: APP_APIS.BASE_URL,
    cancelToken: source.token,
    headers: {
      Authorization: authHeader,
      ...headersData,
    },
  });

  const onSuccess = function (response) {
    // console.log(response);
    return response.data;
  };

  const onError = function (error) {
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export const GetProjectMembers = data => {
  return request({
    url: APP_APIS.GET_PROJECT_MEMBERS,
    body: JSON.stringify({id: data}),
  });
};
export const GetUserDetails = token => {
  return request({
    url: APP_APIS.GET_USER_DETAILS,
    body: JSON.stringify({token}),
  });
};
export const GetAllUsers = (token, data, text) => {
  return request({
    url: APP_APIS.ALL_MEMBERS,
    body: JSON.stringify({token, users: data, text}),
  });
};
export const AddMembersApi = data => {
  return request({
    url: APP_APIS.ADD_MEMBERS,
    body: JSON.stringify(data),
    method: 'PUT',
  });
};

export const AddPostApi = (token, project_id, title, description) => {
  return request({
    url: APP_APIS.ADD_POSTS,
    body: JSON.stringify({title, description, project_id, token}),
  });
};
export const GetPostApi = (token, project_id, date) => {
  return request({
    url: APP_APIS.GET_POSTS,
    body: JSON.stringify({project_id, token, date}),
  });
};

export const GetMonthReport = (token, project_id, date) => {
  return request({
    url: APP_APIS.COMMENTS_BY_MONTH,
    body: JSON.stringify({project_id, token, date}),
  });
};

export const GetChatApi = (token, project_id) => {
  return request({
    url: APP_APIS.GET_CHATS,
    body: JSON.stringify({project_id, token}),
  });
};

export const AddChatApi = (token, project_id, text) => {
  return request({
    url: APP_APIS.ADD_CHATS,
    body: JSON.stringify({project_id, token, text}),
  });
};
