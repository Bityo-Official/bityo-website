/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const navlinks = [
  {
    title: "市場行情",
    href: "/",
  },
  {
    title: "會員帶單",
    href: "/",
  },
  {
    title: "智能合約",
    href: "/",
  },
  {
    title: "關於我們",
    href: "/",
  },
];

const Navbar = () => {
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
              <a
                href={link.href}
                className="mr-10 text-base font-normal hover:text-black/70 dark:hover:text-white/70"
              >
                {link.title}
                <FontAwesomeIcon icon={icon({name: 'coffee', style: 'regular'})} />
              </a>
            </div>
          ))}

          
        </div>
        <div className="z-10 flex items-center justify-end sm:hidden">
          <button className="flex h-10 w-10 items-center justify-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
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