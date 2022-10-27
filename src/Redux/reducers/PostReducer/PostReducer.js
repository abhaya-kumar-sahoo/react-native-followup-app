export const GET_POSTS = 'GET_POSTS';
export const SET_POSTS = 'SET_POSTS';
export const UPDATE_POSTS = 'UPDATE_POSTS';

export const getPosts = (token, project_id, date) => {
  return {
    type: GET_POSTS,
    token,
    project_id,
    date,
  };
};
export const setPosts = ({data}) => {
  return {
    type: SET_POSTS,
    data,
  };
};
export const updatePosts = ({data, isComment}) => {
  return {
    type: UPDATE_POSTS,
    data,
    isComment,
  };
};

export const initialState = {
  loading: false,
  posts: [],
};

export const GetPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {...state, loading: true};
    case SET_POSTS:
      return {...state, loading: false, posts: action.data};
    case UPDATE_POSTS:
      let newData = [...state.posts];
      let length = action.data.project_comments.length;
      if (length > 1) {
        let index = newData.findIndex(
          i => i.postedBy._id === action.data.postedBy._id,
        );
        newData[index].project_comments = action.data.project_comments;
        return {loading: false, posts: newData};
      } else {
        let newData1 = [...state.posts];
        if (action.isComment) {
          let t = newData1.filter(
            i => i.postedBy._id !== action.data.postedBy._id,
          );
          t.push(action.data);
          return {loading: false, posts: t};
        } else {
          newData1.push(action.data);
          return {loading: false, posts: newData1};
        }
      }

    default:
      return {...state};
  }
};
