import { TitleData } from "@/types/Title/Title";
import { cn } from "@/util/cn";

const H3 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h3 className={cn("text-h3 font-bold", props.className)}>{ props.title }</h3>
  )
}

export default H3;
