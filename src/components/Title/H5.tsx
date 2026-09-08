import { TitleData } from "@/types/Title/Title";
import { cn } from "@/util/cn";

const H5 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h5 className={cn("text-h5 font-bold", props.className)}>{ props.title }</h5>
  )
}

export default H5;
