// import { DaysType, GroupeTasks, TaskType } from '../shared-types/sharedTypes';

// export const groupTasksByDate = (tasksList: DaysType[]): GroupeTasks => {
//   return tasksList.reduce<GroupeTasks>((groups, day) => {
//     const date = day.currentDay.split('T')[0];

//     if (!groups[date]) {
//       groups[date] = [];
//     }

//     groups[date].push(day);

//     return groups;
//   }, {});
// };
