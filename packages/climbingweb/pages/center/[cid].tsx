import { CenterInfoContent } from 'climbingweb/src/components/CenterInfo/CenterInfoContent';
import { CenterInfoHead } from 'climbingweb/src/components/CenterInfo/CenterInfoHead';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { AppLogo, BookMarkButton, OptionButton } from 'climbingweb/src/components/common/IconButton';

interface DetailPageProps {
    title: string;
}

export default function CenterDetailPage({ title }: DetailPageProps) {

    return (
        <section className='mb-footer'>
            <AppBar
                leftNode={<AppLogo />}
                rightNode={<div className='flex flex-row gap-x-3'><BookMarkButton /> <OptionButton /></div>}
            />
            <CenterInfoHead title={title} address='어드' />
            <CenterInfoContent />
        </section>
    );
}