import { TitleData } from "@/types/Title/Title";

const H1 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h1 className={`text-h1 font-blod ${props.className}`}>{ props.title }</h1>
  )
}

export default H1;
