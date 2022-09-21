import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppBar } from '.';
import {
  AppLogo,
  BackButton,
  Empty,
  ModifiedButton,
  OptionButton,
  SettingButton,
} from './IconButton';

export default {
  title: 'Web/AppBar',
  component: AppBar,
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
export const Setting = Template.bind({});
export const Back = Template.bind({});
Default.args = {
  leftNode: <AppLogo />,
  title: '',
  rightNode: <OptionButton />,
};
Setting.args = {
  leftNode: <AppLogo />,
  title: '',
  rightNode: (
    <div className="flex gap-6">
      <ModifiedButton />
      <SettingButton />
    </div>
  ),
};
Back.args = {
  leftNode: <BackButton />,
  title: '',
  rightNode: <Empty />,
};
