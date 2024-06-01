import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface InputProps {
  type: string;
  placeholder: string;
  icon?: IconProp;
  className?: string;
}

export interface ExtendedInputProps extends InputProps {
  validate?: (value: string) => boolean;
  errorMessage?: string;
  onCorrect?: () => void;
  onError?: () => void;
}