const initialState = {
  loading: false,
  success: false,
  error: null,
  title: '',
  description: '',
  privacy: '',
  category: '',
  fileName: '',
  fileSize: '',
  fileType: '',
  uploadedBy: '',
  width: 0,
  height: 0,
  video: null,
  videoSrc: '',
  data: null,
};

export const uploadReducer = (state = initialState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
