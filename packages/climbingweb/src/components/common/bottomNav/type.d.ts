export interface ButtonProps {
  path: string;
  icon: JSX.Element;
  activedIcon: JSX.Element;
  label: string;
}

export interface NavProps {
  navButtons: ButtonProps[];
}
