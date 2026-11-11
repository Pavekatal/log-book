import { GroupeTasks, TaskType } from '../shared-types/sharedTypes';

export const groupTasksByDate = (tasksList: TaskType[]): GroupeTasks => {
  return tasksList.reduce<GroupeTasks>((groups, task) => {
    const date = task.createDate.split('T')[0];

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(task);

    return groups;
  }, {});
};
