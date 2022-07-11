import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

let timeoutID;
export const manageNotification = (content, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(content));
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
  };
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
