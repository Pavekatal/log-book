'use client';

import Button from '@/src/components/added-btn/AddedBtn';
import AddTaskForm from '@/src/components/popups/add-task-form/AddTaskForm';
import ScrollContainer from '@/src/components/scroll-container/ScrollContainer';
import TaskCard from '@/src/components/task-card/TaskCard';
import { GroupeTasks, TaskType } from '@/src/shared-types/sharedTypes';
import {
  setOpenAddFormTask,
  updateCheckedTask,
} from '@/src/store/features/taskSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { groupTasksByDate } from '@/src/utils/groupingByCreationDate';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { openAddFormTask, tasks } = useAppSelector((state) => state.tasks);

  const groups: GroupeTasks = groupTasksByDate(tasks);

  const onOpenAddFormTask = () => {
    dispatch(setOpenAddFormTask(!openAddFormTask));
    console.log('openAddFormTask: ', openAddFormTask);
  };

  const onOverlayClick = () => {
    if (openAddFormTask) {
      dispatch(setOpenAddFormTask(false));
    }
  };

  const onCheckedTask = (id: string, isChecked: boolean) => {
    dispatch(updateCheckedTask({ id, checked: isChecked }));
  };

  return (
    <div className="flex flex-col items-center gap-4 text-center w-full">
      <div className="flex items-center justify-center gap-4 ">
        <Button className="btn-add" onClick={onOpenAddFormTask}>
          Добавить задачу
        </Button>
      </div>
      <ScrollContainer className="w-full max-h-[80vh] ">
        {Object.entries(groups).map(([date, tasksInDay]) => (
          <div
            key={date}
            className=" h-auto px-5.25 py-5 border-[0.5px] border-white/50 rounded-[20px] backdrop-filter backdrop-blur-[5px] bg-white/10 flex flex-col gap-4 "
          >
            <span className="text-[24px] font-light flex">
              {date.split('-').reverse().join('.')}
            </span>
            <div className="flex gap-3.5 flex-wrap ">
              {tasksInDay.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onCheckedTask={onCheckedTask}
                />
              ))}
            </div>
          </div>
        ))}
        {/* <div className="absolute top-0 right-0 bottom-0 w-2 rounded-full bg-white/5 backdrop-blur-sm pointer-events-none">
          <div
            id="scroll-thumb"
            className="w-full rounded-full bg-white/30  backdrop-blur-md shadow-sm transition-all duration-75"
          ></div>
        </div> */}
      </ScrollContainer>
      <div onClick={onOverlayClick}>{openAddFormTask && <AddTaskForm />}</div>
    </div>
  );
}
