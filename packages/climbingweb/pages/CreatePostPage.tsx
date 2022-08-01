import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList';

export default function CreatePostPage() {

    const AppBarRightNode = () => {
        return <span className='text-sm text-purple-500'>다음</span>;
    };

    return (
        <>
            <AppBar title='새 게시물' rightNode={<AppBarRightNode />} />
            <UploadImageList />
        </>
    );
}