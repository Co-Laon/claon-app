import { NoticeReponse } from 'climbingweb/types/response/notice';

export const Notification = ({ title, createdAt, content }: NoticeReponse) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold">{title}</h2>
        <p className="text-xs font-medium leading-[18px] text-[#808080]">
          {createdAt}
        </p>
      </div>
      <p className=" text-sm font-medium">{content}</p>
    </div>
  );
};
