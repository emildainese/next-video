import * as type from '../constants/video';

const initialState = {
  videos: [],
  error: null,
  success: false,
  message: '',
};

export const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case type.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        success: true,
      };
    case type.SET_PUBLIC_VIDEOS:
      return {
        ...state,
        videos: action.payload,
        success: true,
      };
    default:
      return state;
  }
};
