/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import { faCircleInfo, faCode, faHouse, faLandmark, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

const navlinks = [
  {
    title: "市場行情",
    href: "/market",
    icon: faLandmark,
  },
  {
    title: "會員帶單",
    href: "/copy_trade",
    icon: faPersonChalkboard,
  },
  {
    title: "智能合約",
    href: "/smart_contract",
    icon: faCode,
  },
  {
    title: "關於我們",
    href: "/aboutus",
    icon: faCircleInfo,
  },
];

const Navbar = () => {
  // const router = useRouter();

  return (
    <nav>
      <div className="flex h-16 z-50 w-full items-center justify-between bg-white px-3 font-bold text-black shadow md:justify-center md:px-7 mb-1 dark:bg-gray-800 dark:text-white">
        <a href="/">
          <button className="flex items-center border-none bg-transparent text-lg normal-case">
            <h1 className="">幣友 Bityo</h1>
          </button>
        </a>
        <div className="hidden flex-1 items-center justify-end sm:flex">

          {/* 寫一個迴圈 */}
          {navlinks.map((link) => (
            <div className="false" key={link.title}>
              <Link
                href={link.href}
                prefetch={false}
                className="mr-10 text-base font-normal hover:text-black/70 dark:hover:text-white/70 flex"
              >
                <FontAwesomeIcon icon={link.icon} className="w-5 pr-1" />
                {link.title}
              </Link>
            </div>
          ))}

          
        </div>
        <div className="z-10 flex items-center justify-end sm:hidden">
          <button className="flex h-10 w-10 items-center justify-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              className="h-[30px] w-[30px]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;