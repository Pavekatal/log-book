'use client';

import { cn } from '@/lib/utils';
import ToggleInputSquare from '../input/ToggleInputSquare';
import { TaskForPatch, TaskType } from '@/src/shared-types/sharedTypes';
import { formattedDate } from '@/src/utils/formattedDate';
import Billet from '../billet/Billet';
import React, { useState } from 'react';
import Input from '../input/Input';
import { useAppDispatch } from '@/src/store/store';
import {
  setIsDeadline,
  setTasks,
  updateCheckedTask,
} from '@/src/store/features/taskSlice';
import DatePickerSmall from '../date-picker/DatePickerSmall';
import { getTasks, patchTask } from '@/src/services/tasks/tasksAPI';

interface TaskProp {
  task: TaskType;
}

export default function TaskCard({ task }: TaskProp) {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataField, setDataField] = useState<TaskForPatch>({});
  let typeTask: string = task.typeTask;

  const onIsEditTask = () => {
    setIsEdit(!isEdit);
    dispatch(setIsDeadline(true));
    console.log(task._id);
  };

  const onCheckedTask = (id: string, isChecked: boolean) => {
    dispatch(updateCheckedTask({ id, checked: isChecked }));
    setDataField((prev) => ({
      ...prev,
      checked: isChecked,
    }));
    console.log('isChecked: ', isChecked);
    console.log('id: ', id);
  };

  const onChangeProgressTask = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const updateProgressTask = e.target.value;
    setDataField((prev) => ({ ...prev, progress: updateProgressTask }));
  };

  const onChangeDate = (date: Date | undefined) => {
    if (date) {
      let ISODate = date.toISOString();
      setDataField((prev) => ({ ...prev, deadline: ISODate }));
      console.log('ISODate: ', ISODate);
    }
  };

  const updateTask = async () => {
    const patchPartialTask: Partial<TaskForPatch> = {};

    if (dataField.deadline !== undefined)
      patchPartialTask.deadline = dataField.deadline;

    if (dataField.progress !== undefined)
      patchPartialTask.progress = dataField.progress;

    if (dataField.checked !== undefined)
      patchPartialTask.checked = dataField.checked;

    if (Object.keys(patchPartialTask).length === 0) {
      console.log('Нет изменений для сохранения');
      setIsEdit(false);
      return;
    }

    try {
      await patchTask(task._id, patchPartialTask);
      const updatedTask = await getTasks();
      dispatch(setTasks(updatedTask));
      console.log('DataField: ', dataField);
      console.log('Задача сохранена успешно');
      setIsEdit(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Произошла ошибка отправки данных', err);
      }
    }
  };

  const onCancelSave = () => {
    setIsEdit(false);
    console.log('Редактирование задачи отменено');
    return;
  };

  const onDeleteTask = () => {
    console.log('deleted task');
    console.log('Задача удалена успешно');
  };

  return (
    <div className="w-98.25 h-auto border-[0.82px] border-white/10 rounded-[8px] backdrop-blur-[5px] bg-white/10 p-3.75 hover:scale-102 transition-transform duration-300 hover:shadow-md hover:shadow-black/10 ">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-1">
          <div className="w-45 flex items-center gap-5 ">
            <div
              className={cn(
                'w-8 h-8 border-[0.75px] border-white/10 rounded-[8px]  bg-white/10 cursor-pointer flex items-center justify-center shadow-[0_4px_14px_-1px_rgba(0,0,0,0.42)] hover:scale-110',
              )}
            >
              {typeTask === 'current' ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                    fill="#c560e4"
                  />
                  <path
                    d="M11.9999 14.9101C11.8099 14.9101 11.6199 14.8401 11.4699 14.6901L7.93991 11.1601C7.64991 10.8701 7.64991 10.3901 7.93991 10.1001C8.22991 9.81007 8.70991 9.81007 8.99991 10.1001L11.9999 13.1001L14.9999 10.1001C15.2899 9.81007 15.7699 9.81007 16.0599 10.1001C16.3499 10.3901 16.3499 10.8701 16.0599 11.1601L12.5299 14.6901C12.3799 14.8401 12.1899 14.9101 11.9999 14.9101Z"
                    fill="#c560e4"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                    fill="#67E6DC"
                  />
                  <path
                    d="M17.5 12C17.5 15.04 15.04 17.5 12 17.5C8.96 17.5 7.10999 14.44 7.10999 14.44M7.10999 17.19V14.44H9.59M6.5 12C6.5 8.96 8.94 6.5 12 6.5C15.67 6.5 17.5 9.56 17.5 9.56M15.06 9.56H17.5V6.81"
                    stroke="#67E6DC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <ToggleInputSquare
              onChange={(e) => onCheckedTask(task._id, e.target.checked)}
              checked={task.checked}
            />
            <p className="font-light text-sm">
              {formattedDate(task.createDate)}
            </p>
          </div>
          <div className="flex gap-2">
            {!isEdit ? (
              <Billet onClick={onIsEditTask} actionType="edit" />
            ) : (
              <div className="flex gap-2">
                <Billet onClick={updateTask} actionType="save" />
                <Billet onClick={onCancelSave} actionType={'cancel'} />
              </div>
            )}
            <Billet onClick={onDeleteTask} actionType={'delete'} />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <h6>{task.title}</h6>

          {!task.progress && task.progress !== '' ? null : (
            <div>
              {!isEdit ? (
                <p className="font-light text-sm">{task.progress}</p>
              ) : (
                <Input
                  value={dataField.progress ?? ''}
                  placeholder={task.progress ? task.progress : 'ход исполнения'}
                  className=" h-6 rounded-[6px] font-extralight text-[14px]"
                  onChange={onChangeProgressTask}
                />
              )}
            </div>
          )}
          {isEdit ? (
            <DatePickerSmall
              selectDate={onChangeDate}
              placeholder={
                task.deadline ? formattedDate(task.deadline) : 'дд.мм.гг'
              }
            />
          ) : task.deadline !== null ? (
            <div className="flex gap-2">
              <p className="font-light text-sm">до: </p>
              <p className="font-bold text-sm">
                {formattedDate(task.deadline)}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
