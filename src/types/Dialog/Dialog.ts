import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface DialogVerifyProps {
  open: boolean;
  onClose: () => void;
  message: string;
  title: string;
  type?: string;
  content: string;
  footer: string;
  icon: IconProp;
  status: boolean;
}