import { TitleData } from "@/types/Title/Title";

const H5 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h5 className={`text-h5 font-blod ${props.className}`}>{ props.title }</h5>
  )
}

export default H5;
