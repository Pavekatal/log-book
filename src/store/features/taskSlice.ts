import { TaskType } from '@/src/shared-types/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  openAddFormTask: boolean;
  isDeadline: boolean;
  tasks: TaskType[];
  message: string;
  isShowMessage: boolean;
  errorMessage: string;
};

const initialState: initialStateType = {
  openAddFormTask: false,
  isDeadline: false,
  tasks: [],
  message: '',
  isShowMessage: false,
  errorMessage: '',
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
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
    },
    updateCheckedTask: (
      state,
      action: PayloadAction<{ id: string; checked: boolean }>,
    ) => {
      state.tasks = state.tasks.map((t) =>
        t._id === action.payload.id
          ? {
              ...t,
              checked: action.payload.checked,
            }
          : t,
      );
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setIsShowMessage: (state, action: PayloadAction<boolean>) => {
      state.isShowMessage = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setOpenAddFormTask,
  setIsDeadline,
  setTasks,
  updateCheckedTask,
  setMessage,
  setIsShowMessage,
  setErrorMessage,
} = taskSlice.actions;
export const taskSliceReducer = taskSlice.reducer;
