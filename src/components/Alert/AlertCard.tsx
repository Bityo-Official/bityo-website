import { AlertCardProps } from "@/types/Alert/AlertCard";
import {
  Typography,
  Alert,
} from "@material-tailwind/react";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";

const AlertCard = (props: AlertCardProps) => {

  return (
    <Alert
      open={props.openAlert}
      className="mt-auto"
      onClose={() => props.onClose()}
    >
      <CubeTransparentIcon className="mb-4 h-12 w-12" />
      <Typography variant="h6" className="mb-1" nonce={undefined} onResize={undefined} onResizeCapture={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        {props.title}
      </Typography>
      <Typography variant="small" className="font-normal opacity-80" nonce={undefined} onResize={undefined} onResizeCapture={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        {props.description}
      </Typography>
      <div className="mt-4 flex gap-3">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="font-medium opacity-80"
          onClick={() => props.leftBtn.onClick()}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {props.leftBtn.text}
        </Typography>
        <Typography
          onClick={() => props.rightBtn.onClick()}
          as="a"
          href="#"
          variant="small"
          className="font-medium"
          nonce={undefined} onResize={undefined}
          onResizeCapture={undefined}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {props.rightBtn.text}
        </Typography>
      </div>
    </Alert>
  );
}

export default AlertCard;