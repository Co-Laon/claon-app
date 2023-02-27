export interface Tab {
  id: number;
  tabName: string;
  tabContent: JSX.Element;
  contentCount?: number;
}
export interface TabBarProps {
  tabList: Tab[];
}
