import { ComponentMeta, ComponentStory } from '@storybook/react';
import CenterResult from './CenterResult';

export default {
  title: 'Web/CenterResult',
  component: CenterResult,
} as ComponentMeta<typeof CenterResult>;

const Template: ComponentStory<typeof CenterResult> = (args) => (
  <CenterResult {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: '더클라이밍',
  id: '1',
};
