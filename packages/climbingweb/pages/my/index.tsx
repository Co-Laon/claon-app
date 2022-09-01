import axios from 'axios';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  AppLogo,
  ModifiedButton,
  SettingButton,
} from 'climbingweb/src/components/common/IconButton';
import { MyContent } from 'climbingweb/src/components/My/MyContent';
import { MyHead } from 'climbingweb/src/components/My/MyHead';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MyPage({}) {
  const router = useRouter();
  const handleGoToSetting = () => {
    router.push('/setting');
  };
  const handleGoToCreateFeed = () => {
    router.push('/feed/create');
  };

  const [imgList, setImageList] = useState<string[]>(['']);
  useEffect(() => {
    const getImgList = async () => {
      await axios
        .get('https://jjalbot.com/api/jjals?text=김연아', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        })
        .then((res) => res.data)
        .then((res) => res?.map((data: any) => data.imageUrl))
        .then((res) => {
          console.log(res);
          setImageList(res);
        });
    };
    getImgList();
  }, []);

  const myInfo = {
    height: 175,
    armReach: 170,
    apeIndex: 2,
  };

  const { height, armReach, apeIndex } = myInfo;
  return (
    <section className=" mb-footer">
      <AppBar
        leftNode={<AppLogo />}
        title=""
        rightNode={
          <div className="flex gap-5">
            <ModifiedButton onClick={handleGoToSetting} />
            <SettingButton onClick={handleGoToCreateFeed} />
          </div>
        }
      />
      <MyHead height={height} armReach={armReach} apeIndex={apeIndex} />
      <MyContent imageList={imgList} />
    </section>
  );
}
