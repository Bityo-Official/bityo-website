import Image from 'next/image';
import Themes from '@/components/Layout/Themes';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import { SidebarListItemProps } from '@/types/Sidebar/Sidebar';

import {
  InformationCircleIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  ChartBarSquareIcon,
  Square3Stack3DIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const ListData: SidebarListItemProps[] = [
    {
      text: "我的帳戶",
      icon: UserCircleIcon,
      disabled: true,
      link: "/account",
    },
    {
      text: "市場行情",
      icon: ChartBarSquareIcon,
      link: "/market",
      chip: {
        value: "11",
        size: "sm",
        color: "light-green",
      }
    },
    {
      text: "社群",
      icon: ChatBubbleLeftRightIcon,
      link: "/community",
    },
    {
      text: "交易所",
      icon: CurrencyDollarIcon,
      link: "/exchange",
    },
    {
      text: "商店",
      disabled: true,
      icon: BuildingStorefrontIcon,
      link: "/store",
    },
    {
      text: "量化交易",
      disabled: true,
      icon: Square3Stack3DIcon,
      link: "/quantify",
    },
    {
      text: "跟單平台",
      icon: PresentationChartBarIcon,
      link: "/follow",
      disabled: true,
    },
    {
      text: "關於我們",
      icon: InformationCircleIcon,
      link: "/about",
    },
    {
      text: "設定",
      disabled: true,
      icon: Cog6ToothIcon,
      link: "/settings",
    },
  ]

  return (
    <>
      <nav className="bg-[#fcfcfc] dark:bg-[rgba(41,44,53,0.3)]">
        <div className="mx-auto px-2 sm:px-6 lg:px-5">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <></>
            </div>
            {/* Logo */}
            <div className="flex flex-1 sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <button onClick={() => router.push('/')}>
                  <Image
                    src="/icon/bityo_with_icon.png"
                    alt="about-image"
                    width={1920}
                    height={1920}
                    className="h-8 w-auto drop-shadow-three dark:drop-shadow-none lg:mr-0"
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
                <IconButton
                  variant="text"
                  size="lg"
                  onClick={() => setIsDrawerOpen(true)}
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Bars3Icon className="h-8 w-8 stroke-2 dark:invert" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <Sidebar
          ListData={ListData}
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
