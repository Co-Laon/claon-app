import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavBar from './NavBar';
import navButtons from './button';
export default {
  title: 'Web/NavBar',
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  navButtons,
};
