import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeedHeader from './FeedHeader';

export default {
  title: 'WEB/FeedHeader',
  component: FeedHeader,
} as ComponentMeta<typeof FeedHeader>;

export const Primary: ComponentStory<typeof FeedHeader> = () => (
  <FeedHeader
    userImage={null}
    userLocation={'비클럭 클라이밍 강남점'}
    userName={'kimclaon85'}
  />
);
