import { IconProps } from "@/types/Icon";
import { useTheme } from "next-themes";
import Image from 'next/image';

// 切換圖片樣式
const Icon = (props: IconProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === 'dark' ? (
        // 如果有傳入 icon_dark，就用 icon_dark
        <Image
          src={props.icon_light}
          alt="Icon Dark"
          className={`${props.className}`}
        ></Image>
      ) : (
        // 如果沒有傳入 icon_dark，就用 icon_light
        <Image
          src={props.icon_dark? props.icon_dark : props.icon_light}
          alt="Icon Light"
          className={`${props.className}`}
        ></Image>
      )}
    </>
  )
}

export default Icon;
