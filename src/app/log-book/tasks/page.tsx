'use client';

import Button from '@/src/components/added-btn/AddedBtn';
import DayCard from '@/src/components/day-card/DayCard';
import AddTaskForm from '@/src/components/popups/add-task-form/AddTaskForm';
import TaskCard from '@/src/components/task-card/TaskCard';
import { setOpenAddFormTask } from '@/src/store/features/taskSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { useEffect, useState } from 'react';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const openAddFormTask = useAppSelector(
    (state) => state.tasks.openAddFormTask,
  );
  const [selectDate, setSelectDate] = useState<boolean>(false);

  const onOpenAddFormTask = () => {
    dispatch(setOpenAddFormTask(!openAddFormTask));
    console.log('openAddFormTask: ', openAddFormTask);
  };

  const onOverlayClick = () => {
    if (openAddFormTask) {
      dispatch(setOpenAddFormTask(false));
    }
  };

  const onSelectDate = () => {
    setSelectDate((prev) => !prev);
  };

  useEffect(() => {
    console.log(selectDate);
  }, [selectDate]);

  return (
    <div className="flex flex-col items-center gap-4 text-center w-full">
      <div className="flex items-center justify-center gap-4 ">
        <Button className="btn-add" onClick={onOpenAddFormTask}>
          Добавить задачу
        </Button>
      </div>
      <div className="flex flex-col gap-5 w-full ">
        <div className=" h-auto px-5.25 py-5 border-[0.5px] border-white/50 rounded-[20px] backdrop-filter backdrop-blur-[5px] bg-white/10 flex flex-col gap-4 ">
          <span className="text-[24px] font-light flex">24.09.2026</span>
          <div className="flex gap 3">
            <TaskCard />
          </div>
        </div>
      </div>

      <div onClick={onOverlayClick}>{openAddFormTask && <AddTaskForm />}</div>
    </div>
  );
}
