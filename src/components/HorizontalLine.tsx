const HorizontalLine = (props: {className?: string}) => {
  return (
    <hr className={`border-neutral-200 dark:border-neutral-800 ${props.className}`} />
  )
}

export default HorizontalLine;
