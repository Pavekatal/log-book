'use client';

import Button from '@/src/components/added-btn/AddedBtn';
import AddTaskForm from '@/src/components/popups/add-task-form/AddTaskForm';
import { setOpenAddFormTask } from '@/src/store/features/taskSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/store';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const openAddFormTask = useAppSelector(
    (state) => state.tasks.openAddFormTask,
  );

  const onOpenAddFormTask = () => {
    dispatch(setOpenAddFormTask(!openAddFormTask));
    console.log('openAddFormTask: ', openAddFormTask);
  };

  const onOverlayClick = () => {
    if (openAddFormTask) {
      dispatch(setOpenAddFormTask(false));
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center ">
      <div className="flex items-center justify-center gap-4">
        <Button className="btn-add" onClick={onOpenAddFormTask}>
          Add Task
        </Button>
      </div>
      <div className="flex flex-col gap-5 ">
        <div className="w-190.25 h-67.5 px-5.25 py-8.75 border border-white rounded-[20px] backdrop-filter backdrop-blur-[10px] bg-white/10  ">
          <h3>Ежедневные задачи</h3>
        </div>
        <div className="w-190.25 h-67.5 px-5.25 py-8.75 border border-white rounded-[20px] backdrop-filter backdrop-blur-[10px] bg-white/10 ">
          <h3>Дополнительные задачи</h3>
        </div>
      </div>
      <div>
        <div>
          <h6>Статистика по УЗ и запросам в ТП</h6>
        </div>
        <div>
          <h6>Создание задачи</h6>
        </div>
      </div>
      <div onClick={onOverlayClick}>{openAddFormTask && <AddTaskForm />}</div>
    </div>
  );
}
