export const GET_CHAT = 'GET_CHAT';
export const SET_CHAT = 'SET_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';

const data = [
  {
    name: 'Abhaya',
    _id: '63608935821e10dc72b6b1a5',
    text: 'Hii',
  },
  {
    name: 'Barsa',
    _id: 2,
    text: 'Hii',
  },

  {
    name: 'Abhaya',
    _id: '63608935821e10dc72b6b1a5',
    text: 'Hii',
  },
  {
    name: 'Gudi',
    _id: 3,
    text: 'Hii',
  },
  {
    name: 'Rashmi',
    _id: 4,
    text: 'Hii',
  },
  {
    name: 'Abhaya',
    _id: '63608935821e10dc72b6b1a5',
    text: 'Hii I am soo soo sorry babu. I just forgot something about ourself',
  },
  {
    name: 'Abhaya',
    _id: '63608935821e10dc72b6b1a5',
    text: 'Hii I am soo soo sorry babu. I just forgot something about ourself',
  },
  {
    name: 'Barsa',
    _id: 2,
    text: 'Hii I am soo soo sorry babu. I just forgot something about ourself',
  },

  {
    name: 'Abhaya',
    _id: '63608935821e10dc72b6b1a5',
    text: 'Hii I am soo soo sorry babu. I just forgot something about ourself',
  },
  {
    name: 'Gudi',
    _id: 3,
    text: 'Hii I am soo soo sorry babu. I just forgot something about ourself',
  },
  {
    name: 'Rashmi',
    _id: 4,
    text: 'Hii',
  },
  {
    name: 'Abhaya',
    _id: '63608935821e10dc72b6b1a5',
    text: 'Hii',
  },
];
export const getChats = (token, project_id) => {
  return {
    type: GET_CHAT,
    token,
    project_id,
  };
};
export const updateChats = (token, data) => {
  return {
    type: UPDATE_CHAT,
    token,
    data,
  };
};
export const setChats = ({data}) => {
  return {
    type: SET_CHAT,
    data,
  };
};

export const initialState = {
  loading: false,
  chats: [],
};

export const GetAllChatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAT:
      return {...state, loading: true};
    case UPDATE_CHAT:
      let newdate = [...state.chats];
      newdate.push(action.data);
      return {...state, chats: newdate, loading: false};
    case SET_CHAT:
      return {...state, loading: false, chats: action.data};
    default:
      return {...state};
  }
};
