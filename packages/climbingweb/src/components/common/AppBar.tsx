interface Props {
    title?: string;
    leftNode?: JSX.Element
    rightNode?: JSX.Element;
}

export function AppBar({ title, leftNode, rightNode }: Props) {

    return (
        <header className='flex flex-row justify-between p-4'>
            {leftNode}
            <h1>{title}</h1>
            {rightNode}
        </header>
    );
}