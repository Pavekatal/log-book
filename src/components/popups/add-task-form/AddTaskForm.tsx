'use client';

import Button from '../../added-btn/AddedBtn';
import Input from '../../input/Input';
import { useEffect, useState } from 'react';
import ToggleInput from '../../input/ToggleInput';
import TextArea from '../../text-area/TextArea';
import DateInput from '../../input/DateInput';
import DatePicker from '../../date-picker/DatePicker';

export default function AddTaskForm() {
  const [currentTypeTask, setCurrentTypeTask] = useState<boolean | null>(null);

  // useEffect(() => {
  //   setCurrentTypeTask('');
  //   console.log('currentTypeTask: ', currentTypeTask);
  // }, []);

  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const onChooseTypeTask = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    let id = e.currentTarget.id;

    if (id === 'daily-task') {
      setCurrentTypeTask(true);
    } else {
      setCurrentTypeTask(false);
    }
  };

  const onAddedTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('Aded task');
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        aria-hidden="true"
      />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-92.75 min-h-130 p-3 z-50 popup-form-task shadow-[0px_4px_67px_-12px_rgba(0,0,0,1)]"
      >
        <h6 className="text-center font-light ">Добавление задачи</h6>
        <div className="min-h-120">
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <p className="font-light text-[14px] ">Ежедневная</p>
              <div
                id="daily-task"
                onClick={onChooseTypeTask}
                className={`w-10 h-10 rounded-lg type-task  flex items-center justify-center shadow-[0px_4px_67px_-5px_rgba(0,0,0,1)] ${currentTypeTask === null ? 'daily-task' : !currentTypeTask && currentTypeTask !== null ? '' : 'choose-daily-task'}`}
              >
                <svg
                  className={` ${currentTypeTask === null ? 'daily-task-lock' : currentTypeTask && currentTypeTask !== null ? 'choose-daily-lock' : 'daily-task-lock'}`}
                  width="31"
                  height="31"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17.5 12C17.5 15.04 15.04 17.5 12 17.5C8.96 17.5 7.10999 14.44 7.10999 14.44M7.10999 17.19V14.44H9.59M6.5 12C6.5 8.96 8.94 6.5 12 6.5C15.67 6.5 17.5 9.56 17.5 9.56M15.06 9.56H17.5V6.81"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer ">
              <p className="font-light text-[14px] ">Текущая</p>
              <div
                id="current-task"
                onClick={onChooseTypeTask}
                className={`w-10 h-10 rounded-lg type-task  flex items-center justify-center shadow-[0px_4px_67px_-5px_rgba(0,0,0,1)] ${!currentTypeTask && currentTypeTask !== null ? 'choose-current-task' : currentTypeTask ? '' : 'current-task'}`}
              >
                <svg
                  className={`${!currentTypeTask && currentTypeTask !== null ? 'choose-current-lock' : 'current-task-icon'}`}
                  width="31"
                  height="31"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" />
                  <path d="M11.9999 14.9101C11.8099 14.9101 11.6199 14.8401 11.4699 14.6901L7.93991 11.1601C7.64991 10.8701 7.64991 10.3901 7.93991 10.1001C8.22991 9.81007 8.70991 9.81007 8.99991 10.1001L11.9999 13.1001L14.9999 10.1001C15.2899 9.81007 15.7699 9.81007 16.0599 10.1001C16.3499 10.3901 16.3499 10.8701 16.0599 11.1601L12.5299 14.6901C12.3799 14.8401 12.1899 14.9101 11.9999 14.9101Z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            {currentTypeTask === null ? (
              ''
            ) : currentTypeTask ? (
              <div className="mt-4 mb-4 p-4 border-t border-b border-white/20 text-[16px] leading-6 font-light  text-[#CB85E1]">
                Ежедневная задача
                <div className="mt-2 flex flex-col gap-3">
                  <div className="mt-2">
                    <Input
                      className="input-daily-task min-w-90 w-full h-9.5  "
                      placeholder="Название задачи"
                    />
                  </div>
                  <TextArea
                    className="input-daily-task w-90 h-20 "
                    placeholder="Описание задачи"
                  />
                  <TextArea
                    className="input-daily-task w-90 h-15 "
                    placeholder="Выполнение ..."
                  />
                </div>
              </div>
            ) : (
              <div className="mt-4 mb-4 p-4 border-t border-b border-white/20  ">
                <div className="flex items-start gap-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-light">Текущая задача</span>
                    <Input
                      className="input-current-task min-w-90 w-full h-9.5  "
                      placeholder="Название задачи"
                    />
                    <TextArea
                      className="input-current-task min-w-85 min-h-30 "
                      placeholder="Описание задачи"
                    />
                    <TextArea
                      className="input-current-task w-full h-15 "
                      placeholder="Выполнение ..."
                    />
                  </div>
                  <DatePicker />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end justify-center">
          <Button onClick={onAddedTask} className="btn-add w-22 h-7.75 ">
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
}
