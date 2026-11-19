import { DaysType, TaskType, UserType } from '@/src/shared-types/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  openAddFormTask: boolean;
  openAddFormDay: boolean;
  isDeadline: boolean;
  tasks: TaskType[];
  message: string;
  isShowMessage: boolean;
  errorMessage: string;
  currentUser: string;
  days: DaysType[];
  today: string;
};

const initialState: initialStateType = {
  openAddFormTask: false,
  openAddFormDay: false,
  isDeadline: false,
  tasks: [],
  message: '',
  isShowMessage: false,
  errorMessage: '',
  currentUser: 'demo',
  days: [],
  today: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setOpenAddFormTask: (state, action: PayloadAction<boolean>) => {
      state.openAddFormTask = action.payload;
    },
    setOpenAddFormDay: (state, action: PayloadAction<boolean>) => {
      state.openAddFormDay = action.payload;
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
      const { id, checked } = action.payload;

      for (const day of state.days) {
        const dailyTask = day.daily.find((t) => t._id === id);

        if (dailyTask) {
          dailyTask.checked = checked;
          break;
        }

        const currentTask = day.current.find((t) => t._id === id);

        if (currentTask) {
          currentTask.checked = checked;
          break;
        }
      }
      // state.tasks = state.tasks.map((t) =>
      //   t._id === action.payload.id
      //     ? {
      //         ...t,
      //         checked: action.payload.checked,
      //       }
      //     : t,
      // );
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
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
    setDays: (state, action: PayloadAction<DaysType[]>) => {
      state.days = action.payload;
    },
    setToday: (state, action: PayloadAction<string>) => {
      state.today = action.payload;
    },
  },
});

export const {
  setOpenAddFormTask,
  setOpenAddFormDay,
  setIsDeadline,
  setTasks,
  updateCheckedTask,
  setMessage,
  setIsShowMessage,
  setErrorMessage,
  setCurrentUser,
  setDays,
  setToday,
} = taskSlice.actions;
export const taskSliceReducer = taskSlice.reducer;
