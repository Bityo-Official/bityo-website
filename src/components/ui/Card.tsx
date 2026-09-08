import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/util/cn";

type DivProps = ComponentPropsWithoutRef<"div">;

export const Card = ({ className, ...rest }: DivProps) => (
  <div
    className={cn("relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md", className)}
    {...rest}
  />
);

interface CardHeaderProps extends DivProps {
  /** false 時取消 material 風格的浮起效果 */
  floated?: boolean;
  shadow?: boolean;
}

export const CardHeader = ({ floated = true, shadow = true, className, ...rest }: CardHeaderProps) => (
  <div
    className={cn(
      "relative mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700",
      floated && "-mt-6",
      shadow ? "shadow-lg" : "shadow-none",
      className,
    )}
    {...rest}
  />
);

export const CardBody = ({ className, ...rest }: DivProps) => (
  <div className={cn("p-6", className)} {...rest} />
);

export const CardFooter = ({ className, ...rest }: DivProps) => (
  <div className={cn("p-6 pt-0", className)} {...rest} />
);

export default Card;
