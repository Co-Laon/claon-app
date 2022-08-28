import { useState } from 'react';

export const TabBar = () => {
  const [openTab, setOpenTab] = useState('');
  const tabList = ['상세정보', '리뷰', '게시글'];
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {tabList.map((tabName) => (
              <li key={tabName} className=" flex-auto text-center">
                <p
                  className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal active:bg-gray-500"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(tabName);
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  {tabName}
                </p>
              </li>
            ))}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {tabList.map((tabName) =>
                  <div
                    key={tabName}
                    className={openTab === tabName ? 'block' : 'hidden'}
                    id="link1"
                  >
                    <p>
                      {tabName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
