import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonSheet } from '.';

export default {
  title: 'Web/ButtonSheet',
  component: ButtonSheet,
} as ComponentMeta<typeof ButtonSheet>;

const Template: ComponentStory<typeof ButtonSheet> = (args) => (
  <ButtonSheet {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: 'CLAON에서 하강하시겠습니까?',
};
