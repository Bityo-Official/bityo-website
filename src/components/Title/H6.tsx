import { TitleData } from "@/types/Title/Title";
import { cn } from "@/util/cn";

const H6 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h6 className={cn("text-h6 font-bold", props.className)}>{ props.title }</h6>
  )
}

export default H6;
