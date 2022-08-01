import { Comments } from 'climbingweb/src/components/Comments/Comments';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { sendReactNativeMessage } from 'climbingweb/src/utils/reactNativeMessage';
import { useEffect } from 'react';

const comments = [
    {
        commentId: '1',
        writerNickName: 'Calvin Hawkins',
        createAt: '22.01.23·12:34',
        writerProfileImage:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus sapiente laudantium natus quam culpa! Iure sit odio obcaecati veritatis error a perferendis doloribus aut laboriosam quis ipsum non, deleniti perspiciatis!',
        isDeleted: false,
        children: [
            {
                commentId: '4',
                writerNickName: 'Calvin Hawkins',
                createAt: '22.01.23·12:34',
                writerProfileImage:
                    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                content:
                    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus sapiente laudantium natus quam culpa! Iure sit odio obcaecati veritatis error a perferendis doloribus aut laboriosam quis ipsum non, deleniti perspiciatis!',
                isDeleted: false,
            },
            {
                commentId: '5',
                writerNickName: 'Calvin Hawkins',
                createAt: '22.01.23·12:34',
                writerProfileImage:
                    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                content:
                    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus sapiente laudantium natus quam culpa! Iure sit odio obcaecati veritatis error a perferendis doloribus aut laboriosam quis ipsum non, deleniti perspiciatis!',
                isDeleted: false,
            },
        ],
    },
    {
        commentId: '2',
        writerNickName: 'Calvin Hawkins',
        createAt: '22.01.23·12:34',
        writerProfileImage:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus sapiente laudantium natus quam culpa! Iure sit odio obcaecati veritatis error a perferendis doloribus aut laboriosam quis ipsum non, deleniti perspiciatis!',
        isDeleted: false,
        children: [],
    },
    {
        commentId: 3,
        writerNickName: 'Calvin Hawkins',
        createAt: '22.01.23·12:34',
        writerProfileImage:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus sapiente laudantium natus quam culpa! Iure sit odio obcaecati veritatis error a perferendis doloribus aut laboriosam quis ipsum non, deleniti perspiciatis!',
        isDeleted: true,
        children: [],
    },
];

export default function CommentPage() {
    useEffect(() => {
        sendReactNativeMessage({ type: 'ui', payload: 'bottom_navi_off' });
        const inputHeight = window.innerHeight;
        console.log(inputHeight);
        return () => {
            sendReactNativeMessage({ type: 'ui', payload: 'bottom_navi_on' });
        };
    }, []);
    return (
        <div>
            <div>
                <AppBar title="댓글" />
                {comments.map((comment) => (
                    <Comments
                        key={comment.commentId}
                        content={comment.content}
                        isDeleted={comment.isDeleted}
                        writerNickName={comment.writerNickName}
                        writerProfileImage={comment.writerProfileImage}
                        createAt={comment.createAt}
                        replies={comment.children}
                    />
                ))}
                <div className='h-24 w-full'></div>
            </div>
            <div className='bg-gray-100 w-full h-24 flex flex-col p-4' style={{ position: 'fixed', bottom: 0 }} >
                <input className="w-full rounded-lg p-4 bg-white" type="text" placeholder='댓글을 입력해 주세요.' />
            </div>
        </div >
    );
}
