import { ButtonProps } from "@/types/Button/Button";
import { Button } from "@material-tailwind/react";

const MyButton = (props: ButtonProps) => {

  return (
    <Button
      className={`flex items-center ${props.className}`}
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      onClick={props.onClick}
      disabled={props.disabled}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {props.children}
      {props.text}
    </Button>
  )
}
export default MyButton;
