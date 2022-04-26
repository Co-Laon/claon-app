import { ComponentStory, ComponentMeta } from '@storybook/react';

import Example from './ExampleList';

export default {
    title: 'WEB/exampleList',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Primary: ComponentStory<typeof Example> = () => <Example />;