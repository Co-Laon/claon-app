interface ButtonProps {
  onClick?: ({}: any) => void;
  children?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  className?: string;
}

export const NormalButton = ({
  onClick,
  children,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`w-full bg-purple-500 rounded-lg w-30 h-[56px] text-white active:bg-purple-400 disabled:bg-gray-300 disabled:text-gray-500 ${className}`}
      disabled={disabled}
      onTouchEnd={onClick}
    >
      {children}
    </button>
  );
};

export const WhiteButton = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      className={`w-full bg-gray-100 rounded-lg w-30 h-12 text-black active:bg-gray-200 ${className}`}
      onTouchEnd={onClick}
    >
      {children}
    </button>
  );
};

export const SmmallNodeButton = ({
  onClick,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      onTouchEnd={onClick}
      className={` w-10 h-6 bg-white border border-gray-300 rounded-lg text-xs ${className}`}
    >
      {children}
    </button>
  );
};
