import { ChangeEvent, useState } from 'react';
import ArrowDown from 'climbingweb/src/assets/icon/ic_20_arrow_down_gray400.svg';
import Image from 'next/image';

interface DropDownProps {
    onSheetOpen?: ({ }: any) => void;
}

export const DropDown = ({ onSheetOpen }: DropDownProps) => {
    const [value, setValue] = useState('');
    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className='border-2 border-gray-300 h-12 w-full bg-white rounded-lg relative flex flex-row items-center justify-between px-4'>
            <input value={value} disabled onChange={e => handleChangeValue(e)} className='h-full w-full outline-0 disabled:bg-white' />
            <Image src={ArrowDown} onClick={onSheetOpen} alt='arrow_down' />
        </div>
    );
};