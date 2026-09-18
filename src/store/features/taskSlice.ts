import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  openAddFormTask: boolean;
  isDeadline: boolean;
};

const initialState: initialStateType = {
  openAddFormTask: false,
  isDeadline: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setOpenAddFormTask: (state, action: PayloadAction<boolean>) => {
      state.openAddFormTask = action.payload;
    },
    setIsDeadline: (state, action: PayloadAction<boolean>) => {
      state.isDeadline = action.payload;
    },
  },
});

export const { setOpenAddFormTask, setIsDeadline } = taskSlice.actions;
export const taskSliceReducer = taskSlice.reducer;
