import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { AppBarRightNode } from 'climbingweb/src/components/CreateFeed/AppbarButton';
import CenterSearchBar from 'climbingweb/src/components/CreateFeed/CenterSearchBar';
import ContentInput from 'climbingweb/src/components/CreateFeed/ContentInput';
import { PostData } from 'climbingweb/src/components/CreateFeed/type';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList/';
import { useState } from 'react';

export default function CreatePostPage() {

    const [page, setPage] = useState<string>('first');
    const [postData, setPostData] = useState<PostData>({
        centerId: '',
        climbingHistories: [{
            climbingCount: 0,
            holdId: '',
        }],
        content: '',
        contentsList: [{
            url: '',
        }],
    });

    const handleContentInput = (content: string) => {
        setPostData({ ...postData, content });
    };
    let test: string[] = ['test', 'testest', 'tttt'];
    return (
        <>
            <AppBar title='새 게시물' rightNode={<AppBarRightNode pageState={page} setPageState={setPage} />} />
            <div className='p-4'>
                {page === 'first' ?
                    <>
                        <UploadImageList />
                        <ContentInput data={postData.content} setData={handleContentInput} />
                    </> :
                    <>
                        <CenterSearchBar searchedCenter={test} />
                    </>
                }
            </div>
        </>
    );
}