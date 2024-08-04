import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
} from "@material-tailwind/react";
import { DialogVerifyProps } from "@/types/Dialog/Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DialogVerify = ({ open, onClose, title, message, type, content, footer, icon, status }: DialogVerifyProps) => {
  return (
    <Dialog
      open={open}
      handler={onClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xs"
      className="bg-black bg-opacity-75"
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <div className="bg-white dark:bg-[#212121] text-black dark:text-white rounded-lg shadow-lg p-6">
        <DialogHeader
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className="flex flex-col items-center "
        >
          <FontAwesomeIcon icon={icon} className={`w-16 h-16 mb-2 ${status ? 'text-green-500' : 'text-red-500'}`} />
          <p className="text-2xl text-black dark:text-white">{title}</p>
          {
            type && (
              <p className="text-sm text-gray-500 dark:text-gray-400">（{ type }）</p>
            )
          }
        </DialogHeader>
        <DialogBody
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className="text-center text-lg font-medium text-black dark:text-white"
        >
          <Chip
            variant="ghost"
            className="text-base text-black dark:text-white bg-[#0D0D13] lowercase"
            color="light-blue"
            value={ content }
            size="lg" 
          />
          <p className="mt-5">{message}</p>
        </DialogBody>
        <DialogFooter
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >

          <Button
            variant="gradient"
            onClick={onClose}
            className="text-web-green hover:text-web-green/80 border border-web-green focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-web-green dark:text-web-green dark:hover:text-web-green/80 dark:focus:ring-web-green/90"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <span>確認</span>
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default DialogVerify;
