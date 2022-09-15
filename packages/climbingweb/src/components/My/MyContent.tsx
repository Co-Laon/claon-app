import { ImageGridList } from '../common/ImageList/ImageGridList';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import { Divder } from '../common/divder/Divder';

interface ContentProps {
  imageList: string[];
}

export const MyContent = ({ imageList }: ContentProps) => {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="px-4">
        <Divder />
      </div>
      <Swiper
        className="w-full"
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide className="px-7 pb-7 flex flex-col gap-2">
          <p>더클라이밍 서울대점 홀드 홀드</p>
          <p>더클라이밍 서울대점</p>
          <p>더클라이밍 서울대점</p>
        </SwiperSlide>
        <SwiperSlide className="px-7 pb-7 flex flex-col gap-2">
          <p>더클라이밍 서울대점 홀드 홀드</p>
          <p>더클라이밍 서울대점</p>
          <p>더클라이밍 서울대점</p>
        </SwiperSlide>
        <SwiperSlide className="px-7 pb-7 flex flex-col gap-2">
          <p>더클라이밍 서울대점 홀드 홀드</p>
          <p>더클라이밍 서울대점</p>
          <p>더클라이밍 서울대점</p>
        </SwiperSlide>
        <SwiperSlide className="px-7 pb-7 flex flex-col gap-2">
          <p>더클라이밍 서울대점 홀드 홀드</p>
          <p>더클라이밍 서울대점</p>
          <p>더클라이밍 서울대점</p>
        </SwiperSlide>
      </Swiper>
      <ImageGridList imageList={imageList} />
    </div>
  );
};
