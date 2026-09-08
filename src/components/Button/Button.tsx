import { ButtonProps } from "@/types/Button/Button";
import { Button } from "@/components/ui/Button";

const MyButton = (props: ButtonProps) => {
  return (
    <Button
      className={`flex items-center ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
      {props.text}
    </Button>
  );
};

export default MyButton;
