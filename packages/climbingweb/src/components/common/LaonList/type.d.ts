export interface LaonProps {
  laonNickName: string;
  laonProfileImage: string;
  rightNode?: JSX.Element;
  disabled?: boolean;
}

export interface LaonListProps {
  laonList: LaonProps[];
  disabled?: boolean;
}

export interface ButtonProps {
  onClick?: ({}: any) => void;
}
