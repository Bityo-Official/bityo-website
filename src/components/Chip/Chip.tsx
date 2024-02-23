import { ChipProps } from "@/types/Chip/Chip"

const Chip = (props: ChipProps) => {
  return (
    <>
      <span className={`${props.color} ${props.bgColor} text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>
        {props.text}
      </span>
    </>
  )
}

export default Chip