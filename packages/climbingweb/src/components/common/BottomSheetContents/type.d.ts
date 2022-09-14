export interface ListSheetProps {
  headerTitle: string;
  list: string[];
  onSelect?: ({}: any) => void;
}

export interface ConfirmSheetProps {
  onConfirm?: ({}: any) => void;
  onCancel?: ({}: any) => void;
  text?: string;
}
