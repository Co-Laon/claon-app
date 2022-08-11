export interface LaonProps {
  laonNickName: string;
  laonProfileImage: string;
  rightNode?: JSX.Element;
}

export interface LaonListProps {
  laonList: LaonProps[];
}

export interface ButtonProps {
  onClick?: ({}: any) => void;
}
