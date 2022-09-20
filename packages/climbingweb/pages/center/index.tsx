import { AppBar } from 'climbingweb/src/components/common/AppBar';
import CenterResultList from 'climbingweb/src/components/common/CenterResult/CenterResultList';
import { CenterProps } from 'climbingweb/src/components/common/CenterResult/type';
import {
  AppLogo,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';

export default function CenterPage({}) {
  const centerListExample: CenterProps[] = [
    { name: '더클라이밍 마곡', star: 4.5, id: '1' },
    { name: '더클라이밍 홍대점', star: 4.5, id: '2' },
    { name: '더클라이밍 홍대점', star: 4.5, id: '3' },
    { name: '더클라이밍 홍대점', star: 4.5, id: '4' },
    { name: '더클라이밍 홍대점', star: 4.5, id: '5' },
    { name: '더클라이밍 홍대점', star: 4.5, id: '6' },
    { name: '더클라이밍 홍대점', star: 4.5, id: '7' },
  ];

  const centerGroupTitleList = [
    '새로운 세팅',
    '즐겨찾는 암장',
    '내 주변 암장',
    '새로운 암장',
  ];

  return (
    <section className="mb-footer">
      <AppBar leftNode={<AppLogo />} title=" " rightNode={<Empty />} />
      <div className="pl-4 flex flex-col gap-6">
        {centerGroupTitleList.map((title) => (
          <div key={title} className="flex flex-col gap-4">
            <h2 className="text-lg font-extrabold leading-6">{title}</h2>
            <CenterResultList centerList={centerListExample} />
          </div>
        ))}
      </div>
    </section>
  );
}
