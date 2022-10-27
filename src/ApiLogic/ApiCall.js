import {APP_APIS} from './API_URL';

export const aboardSignal = new AbortController();

export const request = async ({
  url,
  type = 'POST',
  headers = {'Content-Type': 'application/json'},
  body,
}) => {
  return await fetch(url, {
    method: type,
    headers: headers,
    body: body,
    signal: aboardSignal.signal,
  }).then(response => response.json());
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
    type: 'PUT',
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
