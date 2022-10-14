import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';

export const GetProjectApiCall = data => {
  return request({
    url: APP_APIS.ALL_PROJECTS,
    body: JSON.stringify({token: data}),
  });
};

export const AddProjectApiCall = data => {
  return request({url: APP_APIS.ADD_PROJECT, body: JSON.stringify(data)});
};
