import { AlertCardProps } from "@/types/Alert/AlertCard";
import Alert from "@/components/ui/Alert";
import Typography from "@/components/ui/Typography";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";

const AlertCard = (props: AlertCardProps) => {
  return (
    <Alert open={props.openAlert} onClose={props.onClose} className="mt-auto">
      <CubeTransparentIcon className="mb-4 h-12 w-12" />
      <Typography variant="h6" color="inherit" className="mb-1">
        {props.title}
      </Typography>
      <Typography variant="small" color="inherit" className="font-normal opacity-80">
        {props.description}
      </Typography>
      <div className="mt-4 flex gap-3">
        <Typography
          as="button"
          type="button"
          variant="small"
          color="inherit"
          className="font-medium opacity-80"
          onClick={() => props.leftBtn.onClick()}
        >
          {props.leftBtn.text}
        </Typography>
        <Typography
          as="button"
          type="button"
          variant="small"
          color="inherit"
          className="font-medium"
          onClick={() => props.rightBtn.onClick()}
        >
          {props.rightBtn.text}
        </Typography>
      </div>
    </Alert>
  );
};

export default AlertCard;
