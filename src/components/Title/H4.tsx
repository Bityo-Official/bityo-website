import { TitleData } from "@/types/Title/Title";
import { cn } from "@/util/cn";

const H4 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h4 className={cn("text-h4 font-bold", props.className)}>{ props.title }</h4>
  )
}

export default H4;
