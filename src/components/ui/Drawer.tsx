import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import type { ReactNode } from "react";

type Placement = "left" | "right" | "top" | "bottom";

const PANEL_POSITION: Record<Placement, string> = {
  left: "inset-y-0 left-0 h-full w-[280px] data-closed:-translate-x-full",
  right: "inset-y-0 right-0 h-full w-[280px] data-closed:translate-x-full",
  top: "inset-x-0 top-0 w-full h-[280px] data-closed:-translate-y-full",
  bottom: "inset-x-0 bottom-0 w-full h-[280px] data-closed:translate-y-full",
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: Placement;
  className?: string;
  children: ReactNode;
}

/** 以 Headless UI Dialog 實作的側邊抽屜，取代 @material-tailwind/react 的 Drawer */
const Drawer = ({ open, onClose, placement = "left", className = "", children }: DrawerProps) => (
  <Dialog open={open} onClose={onClose} className="relative z-9999">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-in-out data-closed:opacity-0"
    />
    <DialogPanel
      transition
      className={`fixed bg-white shadow-xl transition-transform duration-300 ease-in-out ${PANEL_POSITION[placement]} ${className}`}
    >
      {children}
    </DialogPanel>
  </Dialog>
);

export default Drawer;
