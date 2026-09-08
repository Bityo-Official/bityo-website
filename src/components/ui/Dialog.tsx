import {
  Dialog as HeadlessDialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type DialogSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_CLASSES: Record<DialogSize, string> = {
  xs: "w-full max-w-xs",
  sm: "w-full max-w-md",
  md: "w-full max-w-2xl",
  lg: "w-full max-w-4xl",
  xl: "w-full max-w-6xl",
};

interface DialogProps {
  open: boolean;
  onClose: () => void;
  size?: DialogSize;
  className?: string;
  children: ReactNode;
}

/** 以 Headless UI 實作，取代 @material-tailwind/react 的 Dialog（含焦點鎖定與 Esc 關閉） */
export const Dialog = ({ open, onClose, size = "md", className = "", children }: DialogProps) => (
  <HeadlessDialog open={open} onClose={onClose} className="relative z-[9999]">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
    />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel
        transition
        className={`${SIZE_CLASSES[size]} rounded-xl transition-all duration-300 ease-out data-[closed]:scale-90 data-[closed]:opacity-0 ${className}`}
      >
        {children}
      </DialogPanel>
    </div>
  </HeadlessDialog>
);

type DivProps = ComponentPropsWithoutRef<"div">;

export const DialogHeader = ({ className = "", ...rest }: DivProps) => (
  <div className={`flex shrink-0 items-center p-4 text-2xl font-semibold ${className}`} {...rest} />
);

export const DialogBody = ({ className = "", ...rest }: DivProps) => (
  <div className={`relative p-4 font-light leading-relaxed ${className}`} {...rest} />
);

export const DialogFooter = ({ className = "", ...rest }: DivProps) => (
  <div className={`flex shrink-0 flex-wrap items-center justify-end p-4 ${className}`} {...rest} />
);

export default Dialog;
