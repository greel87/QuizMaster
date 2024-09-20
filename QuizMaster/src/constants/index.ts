export interface ConfigItem {
  id: string | number;
  name: string | number;
  value?: string;
}

export const difficultyOptions: ConfigItem[] = [
  {
    id: -1,
    name: 'Any',
    value: '-1'
  },
  {
    id: 1,
    name: 'Easy',
    value: 'easy',
  },
  {
    id: 2,
    name: 'Medium',
    value: 'medium',
  },
  {
    id: 3,
    name: 'Difficult',
    value: 'hard',
  },
];

export const typeOptions: ConfigItem[] = [
  {
    id: -1,
    name: 'Any',
    value: '-1'
  },
  {
    id: 1,
    name: 'Multiple choice',
    value: 'multiple',
  },
  {
    id: 2,
    name: 'True / false',
    value: 'boolean',
  },
];

export const numberOfQuestionsOptions: ConfigItem[] = [
  {
    id: 1,
    value: '5',
    name: 5,
  },
  {
    id: 2,
    value: '6',
    name: 6,
  },
  {
    id: 3,
    value: '7',
    name: 7,
  },
  {
    id: 4,
    value: '8',
    name: 8,
  },
  {
    id: 5,
    value: '9',
    name: 9,
  },
  {
    id: 6,
    value: '10',
    name: 10,
  },
];

export const timeOptions: ConfigItem[] = [
  {
    id: 1,
    value: '1',
    name: 1,
  },
  {
    id: 2,
    value: '5',
    name: 5,
  },
  {
    id: 3,
    value: '10',
    name: 10,
  },
];