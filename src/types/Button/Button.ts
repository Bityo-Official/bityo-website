export interface ButtonProps {
  text: string;
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}
