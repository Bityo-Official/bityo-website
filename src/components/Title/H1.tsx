import { TitleData } from "@/types/Title/Title";
import { cn } from "@/util/cn";

const H1 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h1 className={cn("text-h1 font-bold", props.className)}>{ props.title }</h1>
  )
}

export default H1;
