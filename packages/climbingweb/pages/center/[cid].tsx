import { CenterInfoContent } from 'climbingweb/src/components/CenterInfo/CenterInfoContent';
import { CenterInfoHead } from 'climbingweb/src/components/CenterInfo/CenterInfoHead';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { AppLogo, BookMarkButton, OptionButton } from 'climbingweb/src/components/common/IconButton';

interface DetailPageProps {
    title: string;
}

const img = 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const list = [img, img, img, img, img, img, img, img];

export default function CenterDetailPage({ title }: DetailPageProps) {
    title = '더클라이밍 마곡';
    return (
        <section className='mb-footer overflow-auto scrollbar-hide'>
            <AppBar
                leftNode={<AppLogo />}
                rightNode={<div className='flex flex-row gap-x-3'><BookMarkButton /> <OptionButton /></div>}
            />
            <CenterInfoHead title={title} address='서울특별시 강서구 마곡동 796-3 마곡사이언스타워 7층' />
            <CenterInfoContent imageList={list} />
        </section>
    );
}