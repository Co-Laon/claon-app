import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LaonList } from '.';
import { SmmallNodeButton } from '../button/Button';

export default {
  title: 'Web/LaonList',
  component: LaonList,
} as ComponentMeta<typeof LaonList>;

const Template: ComponentStory<typeof LaonList> = (args) => (
  <LaonList {...args} />
);

const laon = {
  laonNickName: 'als95',
  laonProfileImage:
    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  rightNode: <SmmallNodeButton>취소</SmmallNodeButton>,
};

export const Default = Template.bind({});
Default.args = {
  laonList: [laon, laon, laon, laon, laon, laon],
};
