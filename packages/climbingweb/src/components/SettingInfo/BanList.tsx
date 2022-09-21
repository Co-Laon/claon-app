import { SmmallNodeButton } from '../common/button/Button';
import { LaonList } from '../common/LaonList';

export const BanList = ({}) => {
  const testLaon = {
    laonNickName: 'als95@gmail.com',
    laonProfileImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rightNode: <SmmallNodeButton>취소</SmmallNodeButton>,
  };
  const testLaonList = [testLaon, testLaon, testLaon, testLaon, testLaon];
  return (
    <>
      <LaonList laonList={testLaonList} />
    </>
  );
};
