interface Props {
  className?: string;
  title?: string;
  leftNode?: JSX.Element;
  rightNode?: JSX.Element;
}

export function AppBar({ className, title, leftNode, rightNode }: Props) {
  return (
    <header className={`flex flex-row justify-between p-4 ${className}`}>
      {leftNode}
      <h1 className="font-bold">{title}</h1>
      {rightNode}
    </header>
  );
}
