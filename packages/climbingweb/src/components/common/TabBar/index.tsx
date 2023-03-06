import { useState } from 'react';
import { TabBarProps } from './type';

export const TabBar = ({ tabList, className }: TabBarProps) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex list-none flex-wrap pt-2 flex-row" role="tablist">
            {tabList.map(({ id, tabName, tabIcon, ...rest }, index) => (
              <li key={id} className=" flex-auto text-center">
                <p
                  className={`text-sm font-normal text-black flex items-center justify-center uppercase border-[1px] block  h-[4.19vh] ${
                    openTab === index + 1 ? 'border-b-0' : ''
                  } active:bg-gray-500 ${className}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(id);
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  {tabName
                    ? tabName
                    : tabIcon
                    ? tabIcon(openTab === index + 1)
                    : null}
                  {rest.contentCount ? (
                    <span className="ml-1 text-xs leading-[18px] font-bold">
                      {rest.contentCount}
                    </span>
                  ) : null}
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
