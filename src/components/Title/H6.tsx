import { TitleData } from "@/types/Title/Title";

const H6 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h6 className={`text-h6 font-blod ${props.className}`}>{ props.title }</h6>
  )
}

export default H6;
