import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListSheet } from './ListSheet';
export default {
  title: 'Web/ListSheet',
  component: ListSheet,
} as ComponentMeta<typeof ListSheet>;

const Template: ComponentStory<typeof ListSheet> = (args) => (
  <ListSheet {...args} />
);

export const Default = Template.bind({});
Default.args = {
  headerTitle: '요청 부분',
  list: [
    '연락처',
    '사진',
    '운영시간',
    '편의시설',
    '이용요금',
    '홀드정보',
    '세팅일정',
  ],
};
