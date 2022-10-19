import { useState } from 'react';
import { TabBarProps } from './type';

export const TabBar = ({ tabList }: TabBarProps) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex list-none flex-wrap pt-3 flex-row" role="tablist">
            {tabList.map(({ id, tabName }, index) => (
              <li key={id} className=" flex-auto text-center">
                <p
                  className={`text-xs font-bold uppercase px-5 py-3 border-gray-300 border-[1px] block leading-normal ${
                    openTab === index + 1 ? 'border-b-0' : ''
                  } active:bg-gray-500`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(id);
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  {tabName}
                </p>
              </li>
            ))}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
            <div className="flex-auto">
              <div className="tab-content tab-space">
                {tabList?.map(({ id, tabContent }) => (
                  <div key={id} className={openTab === id ? 'block' : 'hidden'}>
                    {tabContent}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
