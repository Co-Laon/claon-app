import { useState } from 'react';
import { Divder } from '../../common/divder/Divder';
import { Notification } from './Notification';
import { Noti, NotiList } from './type';

export const NotificationList = ({ notiList }: NotiList) => {
  const [detail, setDetail] = useState<Noti | null>(null);

  const handleGotoDetail = (target: Noti) => {
    setDetail(target);
  };
  return detail ? (
    <Notification {...detail} />
  ) : (
    <div className="w-full flex flex-col gap-2">
      {notiList.map(({ title, date, content }) => (
        <div
          key={title}
          className="w-full flex flex-col gap-2"
          onTouchEnd={() => handleGotoDetail({ title, date, content })}
        >
          <h2 className="text-base font-medium leading-6">{title}</h2>
          <p className=" text-xs font-medium leading-4 text-gray-500">{date}</p>
          <Divder />
        </div>
      ))}
    </div>
  );
};
