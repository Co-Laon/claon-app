export interface Tab {
  id: number;
  tabName?: string;
  tabIcon?: (focus: boolean) => JSX.Element;
  tabContent: JSX.Element;
  contentCount?: number;
}
export interface TabBarProps {
  tabList: Tab[];
  className?: string;
}
