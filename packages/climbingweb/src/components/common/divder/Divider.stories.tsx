import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Divder } from './Divder';

export default {
  title: 'Web/Divder',
  component: Divder,
} as ComponentMeta<typeof Divder>;

const Template: ComponentStory<typeof Divder> = () => <Divder />;

export const Default = Template.bind({});
Default.args = {};
