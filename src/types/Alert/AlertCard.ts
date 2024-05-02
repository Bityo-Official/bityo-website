export interface AlertCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  openAlert: boolean;
  onClose: () => void;
  leftBtn: {
    text: string;
    onClick: () => void;
  },
  rightBtn: {
    text: string;
    onClick: () => void;
  }
}