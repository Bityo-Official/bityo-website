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
    >
      { props.children }
      { props.text }
    </Button>
  )
}
export default MyButton;
