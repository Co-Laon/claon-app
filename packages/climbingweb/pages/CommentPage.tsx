import { Comments } from 'climbingweb/src/component/Comment/Comment';
import { AppBar } from 'climbingweb/src/component/common/AppBar';
import { sendReactNativeMessage } from 'climbingweb/src/utils/reactNativeMessage';
import { useTheme } from 'next-themes';

const comments = [
  {
    commentId: '1',
    writerNickName: 'Calvin Hawkins',
    createAt: '22.01.23·12:34',
    writerProfileImage:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      '82 bars 찢어 니 verse 나는 랩전설 한국힙합 다시 건설 Who wanna battle me You better be flatterin me 우린 너무 달라 lv이 yuh 가짜 친구들 끼리 끼리 frenemy ',
    isDeleted: false,
    children: [
      {
        commentId: '4',
        writerNickName: 'Calvin Hawkins',
        createAt: '22.01.23·12:34',
        writerProfileImage:
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
          '82 bars 찢어 니 verse 나는 랩전설 한국힙합 다시 건설 Who wanna battle me You better be flatterin me 우린 너무 달라 lv이 yuh 가짜 친구들 끼리 끼리 frenemy ',
        isDeleted: false,
      },
      {
        commentId: '5',
        writerNickName: 'Calvin Hawkins',
        createAt: '22.01.23·12:34',
        writerProfileImage:
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
          '82 bars 찢어 니 verse 나는 랩전설 한국힙합 다시 건설 Who wanna battle me You better be flatterin me 우린 너무 달라 lv이 yuh 가짜 친구들 끼리 끼리 frenemy ',
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
      '82 bars 찢어 니 verse 나는 랩전설 한국힙합 다시 건설 Who wanna battle me You better be flatterin me 우린 너무 달라 lv이 yuh 가짜 친구들 끼리 끼리 frenemy ',
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
      '82 bars 찢어 니 verse 나는 랩전설 한국힙합 다시 건설 Who wanna battle me You better be flatterin me 우린 너무 달라 lv이 yuh 가짜 친구들 끼리 끼리 frenemy ',
    isDeleted: true,
    children: [],
  },
];

export default function CommentModal() {
  const { setTheme } = useTheme();
  setTheme('light');
  return (
    <>
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
      <input className="bg-black" type="text" />
      <button
        onClick={() =>
          sendReactNativeMessage({ type: 'ui', payload: 'bottom_navi_off' })
        }
      >
        ASDF
      </button>
    </>
  );
}
