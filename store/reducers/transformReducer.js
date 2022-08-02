const initialState = {
  videoWidth: 600,
  videoHeight: 500,
  quality: 60,
  background: '#000000',
  crop: '',
  rotate: 0,
  format: '',
};

export const transformReducer = (state = initialState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
