import Image from 'next/image';
import { useTheme } from 'next-themes';
import Themes from '@/components/Layout/Themes';
import Icon from '@/components/Icon';
import BityoIcon from '@/images/icon/bityo_with_icon.png';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';

const Navbar = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#fcfcfc] dark:bg-[#292C35]">
        <div className="mx-auto px-2 sm:px-6 lg:px-5">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <></>
            </div>
            {/* Logo */}
            <div className="flex flex-1 sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <button onClick={() => router.push('/')}>
                  <Icon
                    icon_light={BityoIcon}
                    className="h-8 w-auto"
                  />
                </button>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* 切換主題 */}
              <div className="relative ml-3">
                <Themes></Themes>
              </div>
              {/* 搜尋 */}
              {/* <div className="relative ml-3">
                <SearchBtn></SearchBtn>
              </div> */}
              {/* 更多 */}
              <div className="relative ml-3">
                <IconButton variant="text" size="lg" onClick={() => setIsDrawerOpen(true)} nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                  <Bars3Icon className="h-8 w-8 stroke-2 dark:invert" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <Sidebar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        ></Sidebar>

        <div className="sm:hidden" id="mobile-menu">
        </div>
      </nav>

    </>
  )
}

export default Navbar;
