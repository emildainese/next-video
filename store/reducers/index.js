import { combineReducers } from 'redux';
import { transformReducer } from './transformReducer';
import { uploadReducer } from './uploadReducer';
import { videosReducer } from './videosReducer';

const reducers = combineReducers({
  upload: uploadReducer,
  transformation: transformReducer,
  publicVideos: videosReducer,
});

export default reducers;
