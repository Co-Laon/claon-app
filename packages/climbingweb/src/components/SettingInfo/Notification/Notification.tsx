import { Noti } from './type';

export const Notification = ({ title, date, content }: Noti) => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <div>
        <h2 className="text-base font-bold leading-6">{title}</h2>
        <p className="text-xs font-medium leading-4 text-gray-500">{date}</p>
      </div>
      <p className=" text-sm font-medium leading-4">{content}</p>
    </div>
  );
};
