import { ComponentMeta } from '@storybook/react';
import { AreaDropDown } from './DropDown';

export default {
    title: 'App/DropDown',
    component: AreaDropDown,
} as ComponentMeta<typeof AreaDropDown>;

export const FirtDropDown = () => <AreaDropDown placeholder='도·시' value='' onPress={() => { }} />;
export const SecondDropDown = () => <AreaDropDown placeholder='시·군·구' value='' onPress={() => { }} />;