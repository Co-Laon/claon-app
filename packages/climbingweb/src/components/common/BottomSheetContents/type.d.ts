export interface ListSheetProps {
  headerTitle: string;
  list: string[];
  onSelect: ({}: any) => void;
  className?: string
}

export interface ConfirmSheetProps {
  onConfirm?: ({}: any) => void;
  onCancel?: ({}: any) => void;
  text?: string;
}
