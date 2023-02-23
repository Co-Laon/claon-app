import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StarRating } from '.';

export default {
  title: 'Web/StarRating',
  component: StarRating,
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
  <StarRating {...args} />
);

export const Default = Template.bind({});
Default.args = {
  count: 5,
  disabled: false,
  size: 'xs',
  initialValue: 2.5,
};
