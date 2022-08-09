
interface ContentProps {
    data: string;
    setData: (content: string) => void;
}

export default function ContentInput({ data, setData }: ContentProps) {

    return (
        <div className='border h-96 w-full border-gray resize-none rounded-lg mt-10 p-4'>
            <textarea onChange={(e) => setData(e.target.value)} value={data} placeholder='500자 이내 글 입력' className=' w-full h-full placeholder:text-gray focus:outline-none resize-none' />
        </div>
    );
}