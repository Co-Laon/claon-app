import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileImage } from './ProfileImage';

export default {
  title: 'Web/ProfileImage',
  component: ProfileImage,
} as ComponentMeta<typeof ProfileImage>;

const Template: ComponentStory<typeof ProfileImage> = (args) => (
  <ProfileImage {...args} />
);

export const Default = Template.bind({});
export const Insta = Template.bind({});
const img =
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
Default.args = {
  src: img,
  icon: 'default',
};
Insta.args = {
  src: img,
  icon: 'insta',
};
