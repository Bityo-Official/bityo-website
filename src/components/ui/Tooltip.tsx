import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStyles,
  type Placement,
} from "@floating-ui/react";
import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/util/cn";

interface TooltipProps {
  content: ReactNode;
  placement?: Placement;
  className?: string;
  /** 觸發元素，會被複製並附加定位 ref 與事件（不會額外包一層 wrapper） */
  children: ReactElement<Record<string, unknown>>;
}

/**
 * 以 Floating UI 實作的 Tooltip，取代 @material-tailwind/react 的 Tooltip。
 * 會 clone children 而非外包 wrapper，以免破壞 table / flex 的版面。
 */
const Tooltip = ({ content, placement = "top", className, children }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { move: false, delay: { open: 100, close: 0 } }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: { opacity: 0, transform: "scale(0.95)" },
  });

  // 合併 children 原有的 ref（React 19 起 ref 就是一般的 prop）
  const childRef = (children.props as { ref?: React.Ref<unknown> }).ref;
  // Floating UI 的 refs.setReference / setFloating 是 callback ref（函式），不是 ref.current，
  // 在 render 期間傳給 ref= 正是正確用法；react-hooks/refs 在這裡是誤判。
  // eslint-disable-next-line react-hooks/refs
  const referenceRef = useMergeRefs([refs.setReference, childRef ?? null]);

  if (!isValidElement(children)) return children;

  return (
    <>
      {cloneElement(children, {
        ...getReferenceProps({ ...children.props, ref: referenceRef } as Record<string, unknown>),
      })}
      {isMounted && (
        <FloatingPortal>
          <div
            // eslint-disable-next-line react-hooks/refs -- 同上：setFloating 是 callback ref
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-9999 max-w-xs"
          >
            <div
              style={transitionStyles}
              className={cn("rounded-lg bg-black/80 px-3 py-2 text-sm font-normal text-white shadow-lg", className)}
            >
              {content}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
