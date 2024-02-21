import { ButtonProps } from "@/types/Button/Button";
import { useEffect, useState } from "react";

const Button = (props: ButtonProps) => {
  const buttonType = props.type;
  const [buttonSize, setButtonSize] = useState('');

  useEffect(() => {
    if (buttonType === 'large') {
      setButtonSize('px-6 py-[9px]');
    } else if (buttonType === 'medium') {
      setButtonSize('px-3 py-[5px]');
    } else if (buttonType === 'small') {
      setButtonSize('px-2 py-[5px]');
    }
  }, []);

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`
      border-[1px] rounded-full min-w-32
      ${props.className}
      `}
    >
      {props.children}
    </button>
  )
}
export default Button;
