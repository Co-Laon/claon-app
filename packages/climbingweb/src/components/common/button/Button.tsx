interface ButtonProps {
  onClick?: ({}: any) => void;
  children?: React.ReactNode | React.ReactNode[];
}

export const NormalButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="w-full bg-purple-500 rounded-lg w-30 h-12 text-white active:bg-purple-400"
      onTouchEnd={onClick}
    >
      {children}
    </button>
  );
};

export const WhiteButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="w-full bg-gray-100 rounded-lg w-30 h-12 text-black active:bg-gray-200"
      onTouchEnd={onClick}
    >
      {children}
    </button>
  );
};

export const SmmallNodeButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onTouchEnd={onClick}
      className=" w-10 h-6 bg-white border border-gray-300 rounded-lg text-xs"
    >
      {children}
    </button>
  );
};
