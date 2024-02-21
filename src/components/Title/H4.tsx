import { TitleData } from "@/types/Title/Title";

const H4 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h4 className={`text-h4 font-blod ${props.className}`}>{ props.title }</h4>
  )
}

export default H4;
