export const GET_PROJECT = 'GET_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';

export const ADD_PROJECT = 'ADD_PROJECT';

export const getAllProjects = ({data}) => {
  return {
    type: GET_PROJECT,
    data,
  };
};
export const setAllProjects = ({data}) => {
  return {
    type: SET_PROJECT,
    data,
  };
};
export const AddProjects = ({data}) => {
  return {
    type: ADD_PROJECT,
    data,
  };
};

const initialState = {
  posts: [],
  loading: false,
  error: false,
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return {...state, loading: true};

    case SET_PROJECT:
      return {...state, loading: false, posts: action.data};

    case ADD_PROJECT:
      let timelinePostNew = [...state.posts];

      timelinePostNew.push(action.data);
      return {...state, posts: timelinePostNew};

    default:
      return {...state};
  }
};
