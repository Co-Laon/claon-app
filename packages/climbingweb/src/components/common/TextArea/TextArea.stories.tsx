import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from './TextArea';

export default {
  title: 'Web/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Default = Template.bind({});
Default.args = {
  setData: ({}) => {},
  placeholder: '500자 이내로 입력해주세요',
};
