import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Themes = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 掛載 mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // 切換主題
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 確保 component 掛載後再 render
  if (!mounted) {
    return null;
  }

  return (
    <button onClick={toggleTheme} className="w-[6.125rem] h-[2.5rem] rounded-full p-1 bg-gray-200 dark:bg-[#6B6B6B] border-[1px] border-neutral-300 dark:border-neutral-600 relative transition-colors duration-500 ease-in">
      {
        theme === 'dark' || (!theme && resolvedTheme === 'dark') ? (
          <div className="rounded-full w-8 h-8 border-gray-700 dark:bg-gray-700 relative dark:ml-[3.6rem] pointer-events-none transition-all duration-300 ease-out">
            <MoonIcon className="w-[50%] h-[100%] mr-auto ml-auto inline-block align-middle" />
          </div>
        ) : (
          <div className="rounded-full border-gray-300 border-[1px] w-8 h-8 bg-white relative dark:ml-0 pointer-events-none transition-all duration-300 ease-out">
            <SunIcon className="w-[50%] h-[100%] mr-auto ml-auto inline-block align-middle" />
          </div>
        )
      }
    </button>
  );
};

export default Themes;
