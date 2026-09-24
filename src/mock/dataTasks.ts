import { TaskType } from '../shared-types/sharedTypes';

export const dataTasks: TaskType[] = [
  {
    _id: '1',
    title: 'мониторинг ис',
    typeTask: 'daily',
    createDate: '01.01.2026',
    progress: '',
    checked: false,
    deadline: null,
  },
  {
    _id: '2',
    title: 'обновить инструкцию',
    typeTask: 'current',
    createDate: '01.01.2026',
    progress: 'начать ...',
    checked: false,
    deadline: null,
  },
  {
    _id: '3',
    title: 'подготовить ответ на письмо',
    typeTask: 'current',
    createDate: '01.01.2026',
    progress: 'провести анализ',
    checked: false,
    deadline: '30.09.2026',
  },
];
