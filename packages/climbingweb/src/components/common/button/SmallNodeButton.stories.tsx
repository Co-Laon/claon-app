import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SmmallNodeButton } from './Button';

export default {
  title: 'Web/SmmallNodeButton',
  component: SmmallNodeButton,
} as ComponentMeta<typeof SmmallNodeButton>;

const Template: ComponentStory<typeof SmmallNodeButton> = (args) => (
  <SmmallNodeButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: '취소',
};
