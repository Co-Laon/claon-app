import Image from 'next/image';

interface Props {
    commentId?: string;
    content: string;
    isDeleted: boolean;
    postId?: string;
    writerNickName: string;
    writerProfileImage: string;
    createAt?: string;
    updateAt?: string;
    replies?: {
        commentId?: string;
        content: string;
        isDeleted: boolean;
        postId?: string;
        writerNickName: string;
        writerProfileImage: string;
        createAt?: string;
        updateAt?: string;
    }[];
}


const Commment = ({
    content,
    isDeleted,
    writerNickName,
    writerProfileImage,
    createAt,
    updateAt,
    replies,
}: Props) => {
    const isReply = replies ? true : false;

    return (
        <div className='w-screen flex flex-row'>
            <div className='flex flex-row py-4 gap-2'>
                <div className='h-10 w-10 relative'>
                    <Image className='rounded-full' layout="fill" objectFit='cover' src={writerProfileImage} alt="comment" />
                </div>
                <div className='w-screen gap-2'>
                    <div className='h-10'>
                        <p className='text-sm font-bold'>{writerNickName}</p>
                        <p className='text-gray-400 '>{updateAt ? updateAt : createAt} {isReply && <span className='hover:text-black' onClick={() => { }}>·답댓글 달기</span>}</p>
                    </div>
                    <div className='w-screen'>
                        <p className='text-sm line-clamp-3 '>{isDeleted ? '삭제된 게시글 입니다' : content}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export function Comments({
    content,
    isDeleted,
    writerNickName,
    writerProfileImage,
    createAt,
    updateAt,
    replies,
}: Props) {

    const count = replies ? replies.length - 3 : 0;

    return (
        <>
            <Commment
                content={content}
                isDeleted={isDeleted}
                writerNickName={writerNickName}
                writerProfileImage={writerProfileImage}
                createAt={createAt}
                updateAt={updateAt}
                replies={replies}
            />
            {
                replies && <div className='pl-10' >
                    {replies.map(reply =>
                        <Commment
                            key={reply.commentId}
                            content={reply.content}
                            isDeleted={reply.isDeleted}
                            writerNickName={reply.writerNickName}
                            writerProfileImage={reply.writerProfileImage}
                            createAt={reply.createAt}
                            updateAt={reply.updateAt}
                        />
                    )}
                    {count > 0 &&
                        <div className='flex flex-row h-10 content-center items-center'>
                            <div className='bg-gray-400 h-px w-8 mr-3' />
                            <span className='text-gray-400'>대댓글 {count}개 더 보기</span>
                        </div>}
                </div>
            }
        </>
    );

}