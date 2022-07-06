import { ComponentMeta } from '@storybook/react';
import { DropDown } from './DropDown';

export default {
    title: 'App/DropDown',
    component: DropDown,
} as ComponentMeta<typeof DropDown>;

export const FirtDropDown = () => <DropDown placeholder='도·시' value='' onPress={() => { }} />;
export const SecondDropDown = () => <DropDown placeholder='시·군·구' value='' onPress={() => { }} />;