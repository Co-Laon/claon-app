import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NormalButton } from './Button';

export default {
  title: 'Web/NormalButton',
  component: NormalButton,
} as ComponentMeta<typeof NormalButton>;

const Template: ComponentStory<typeof NormalButton> = (args) => (
  <NormalButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: '완료',
};
