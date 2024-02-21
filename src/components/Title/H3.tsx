import { TitleData } from "@/types/Title/Title";

const H3 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h3 className={`text-h3 font-blod ${props.className}`}>{ props.title }</h3>
  )
}

export default H3;
