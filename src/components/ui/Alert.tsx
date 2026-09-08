import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { cn } from "@/util/cn";

interface AlertProps {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  children: ReactNode;
}

/** 取代 @material-tailwind/react 的 Alert；有傳 onClose 時右上角顯示關閉鈕 */
const Alert = ({ open = true, onClose, className, children }: AlertProps) => {
  if (!open) return null;

  return (
    <div
      role="alert"
      className={cn("relative w-full rounded-lg bg-gray-900 p-4 font-sans text-base text-white", className)}
    >
      {children}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className="absolute right-3 top-3 rounded-lg p-1 transition-opacity hover:opacity-70"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
