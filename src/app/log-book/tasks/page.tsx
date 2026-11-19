'use client';

import Button from '@/src/components/added-btn/AddedBtn';
import AddDayForm from '@/src/components/popups/add-day-form/AddDayForm';

import AddTaskForm from '@/src/components/popups/add-task-form/AddTaskForm';
import MessageForm from '@/src/components/popups/message-form/MessageForm';
import ScrollContainer from '@/src/components/scroll-container/ScrollContainer';
import TaskCard from '@/src/components/task-card/TaskCard';
import { GroupeTasks, TaskType } from '@/src/shared-types/sharedTypes';
import {
  setIsShowMessage,
  setOpenAddFormDay,
  setOpenAddFormTask,
} from '@/src/store/features/taskSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
// import { groupTasksByDate } from '@/src/utils/groupingByCreationDate';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const {
    openAddFormTask,
    openAddFormDay,
    days,
    tasks,
    message,
    isShowMessage,
  } = useAppSelector((state) => state.tasks);

  // const currentDate = days[0].currentDay.split('-').reverse().join('.');
  const dailyTasks = days.map((day) => day.daily);
  const currentTasks = days.map((day) => day.current);
  // console.log('currentDate: ', currentDate);

  const onOpenAddFormTask = () => {
    dispatch(setOpenAddFormTask(!openAddFormTask));
  };

  const onOverlayClick = () => {
    if (openAddFormTask) {
      dispatch(setOpenAddFormTask(false));
    }

    if (openAddFormDay) {
      dispatch(setOpenAddFormDay(false));
    }

    if (isShowMessage) {
      dispatch(setIsShowMessage(false));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 text-center w-full">
      <ScrollContainer className="w-full max-h-[95vh] ">
        {days.map((day) => (
          <div
            key={day._idDay}
            className=" h-auto px-5.25 py-5 border-[0.5px] border-white/50 rounded-[20px] backdrop-filter backdrop-blur-[5px] bg-white/10 flex flex-col gap-4 "
          >
            <div className="flex items-center gap-5">
              <span className="text-[24px] font-light flex">
                {day.currentDay.split('-').reverse().join('.')}
              </span>
              <Button
                className="btn-add hover:scale-101"
                onClick={onOpenAddFormTask}
              >
                Добавить задачу
              </Button>
            </div>

            <div className="flex gap-3.5 flex-wrap ">
              <div className="flex gap-3.5 flex-wrap w-full py-3  border-t border-t-white/20 border-b border-b-white/20">
                {dailyTasks.map((tasks) =>
                  tasks.map((task) => <TaskCard key={task._id} task={task} />),
                )}
              </div>

              <div className="flex gap-3.5 flex-wrap pb-3">
                {currentTasks.map((tasks) =>
                  tasks.map((task) => <TaskCard key={task._id} task={task} />),
                )}
              </div>
            </div>
          </div>
        ))}
      </ScrollContainer>
      <div onClick={onOverlayClick}>
        {openAddFormTask && <AddTaskForm />}
        {openAddFormDay && <AddDayForm />}
      </div>
      <div onClick={onOverlayClick}>
        {isShowMessage && <MessageForm message={message} />}
      </div>
    </div>
  );
}
