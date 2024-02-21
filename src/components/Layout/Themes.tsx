import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useTheme } from "next-themes";
import Image from 'next/image';
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Themes = () => {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-[6.125rem] h-[2.5rem] rounded-full p-1 bg-gray-200 dark:bg-[#6B6B6B] relative transition-colors duration-500 ease-in">
      {
        // 如果是 dark mode
        theme === 'dark' ? (
          <div
            className="rounded-full w-8 h-8 border-gray-700 dark:bg-gray-700 relative dark:ml-[3.6rem] pointer-events-none transition-all duration-300 ease-out">
            <MoonIcon className="w-[50%] h-[50%] mr-auto ml-auto inline-block align-middle" />
          </div>
        ) : (
          // 如果是 light mode
          <div
            className="rounded-full border-gray-300 border-[1px] w-8 h-8 bg-white relative dark:ml-0 pointer-events-none transition-all duration-300 ease-out">
            <SunIcon className="w-[50%] h-[50%] mr-auto ml-auto inline-block align-middle" />
          </div>
        )
      }
    </button>
  )
}

export default Themes;
