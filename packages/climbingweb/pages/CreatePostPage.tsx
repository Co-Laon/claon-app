import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList';

export default function CreatePostPage() {

    const AppBarRightNode = () => {
        return <span className='text-sm text-purple-500'>다음</span>;
    };


    const testImage = 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
    const ImageList = [
        testImage, testImage, testImage
    ];

    return (
        <>
            <AppBar title='새 게시물' rightNode={<AppBarRightNode />} />
            <UploadImageList imageList={ImageList} />
        </>
    );
}