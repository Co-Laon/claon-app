import { useState } from 'react';


interface SearchBarProps {
    value?: string;
    placeholder?: string;
    searchedCenter?: string[];
    setCenterId?: ({ }) => void;
}

export default function CenterSearchBar({ placeholder, searchedCenter }: SearchBarProps) {
    const [value, setValue] = useState<string>();
    return (
        <>
            <input type='text' value={value} onChange={() => setValue(value)} placeholder={placeholder} className='w-full h-10 border border-gray-300 rounded-lg' />
            {searchedCenter && <ul className='w-full border border-gray-300 rounded-lg'>
                {searchedCenter.map(center =>
                    <li className='border-b border-gray-300' key={center}>{center}</li>)
                }
            </ul>
            }
        </>
    );
}