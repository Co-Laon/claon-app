import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from '.';
import { StringCount } from './StringCount';

export default {
    title: 'WEB/Input',
    component: Input,
} as ComponentMeta<typeof Input>;

export const Primary: ComponentStory<typeof Input> = () => <Input rightNode={<StringCount maxCount={20} count={0} />} />;