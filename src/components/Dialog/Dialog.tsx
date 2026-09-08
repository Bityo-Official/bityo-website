import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import { DialogVerifyProps } from "@/types/Dialog/Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DialogVerify = ({ open, onClose, title, message, type, content, icon, status }: DialogVerifyProps) => {
  return (
    <Dialog open={open} onClose={onClose} size="xs">
      <div className="rounded-lg bg-white p-6 text-black shadow-lg dark:bg-[#212121] dark:text-white">
        <DialogHeader className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={icon}
            className={`mb-2 h-16 w-16 ${status ? "text-green-500" : "text-red-500"}`}
          />
          <p className="text-2xl text-black dark:text-white">{title}</p>
          {type && <p className="text-sm text-gray-500 dark:text-gray-400">（{type}）</p>}
        </DialogHeader>

        <DialogBody className="text-center text-lg font-medium text-black dark:text-white">
          <Chip
            className="bg-[#0D0D13] text-base lowercase text-black dark:text-white"
            color="light-blue"
            value={content}
            size="lg"
          />
          <p className="mt-5">{message}</p>
        </DialogBody>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="me-2 mb-2 rounded-lg border border-web-green px-5 py-2.5 text-center text-sm font-medium text-web-green hover:text-web-green/80 focus-visible:ring-green-300 dark:border-web-green dark:text-web-green dark:hover:text-web-green/80 dark:focus-visible:ring-web-green/90"
            variant="outlined"
          >
            <span>確認</span>
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default DialogVerify;
