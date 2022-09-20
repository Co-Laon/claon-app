import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TabBar } from '.';

export default {
  title: 'Web/TabBar',
  component: TabBar,
} as ComponentMeta<typeof TabBar>;

const tabList = [
  {
    id: 1,
    tabName: '상세정보',
    tabContent: <div>상세정보</div>,
  },
  {
    id: 2,
    tabName: '리뷰',
    tabContent: <div>리뷰</div>,
  },
  {
    id: 3,
    tabName: '게시글',
    tabContent: <div>게시글</div>,
  },
];

const Template: ComponentStory<typeof TabBar> = (args) => <TabBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabList,
};
