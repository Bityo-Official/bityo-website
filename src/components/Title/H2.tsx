import { TitleData } from "@/types/Title/Title";

const H2 = (props: TitleData) => {
  return (
    // Font Weight: 700
    <h2 className={`mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] ${props.className}`}>{ props.title }</h2>
  )
}

export default H2;
