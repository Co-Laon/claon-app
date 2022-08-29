export interface Tab {
  id: number;
  tabName: string;
  tabContent: JSX.Element;
}
export interface TabBarProps {
  tabList: Tab[];
}
