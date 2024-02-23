"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';

import BityoLogo from "@/images/icon/bityo_with_icon.png";
import { faFacebookF, faGithub, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const router = useRouter();

  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-[rgba(41,44,53,0.3)] md:pt-20 lg:pt-24">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 inline-block">
                  <Image
                    src={BityoLogo}
                    alt="logo"
                    className="w-full"
                    width={140}
                    height={30}
                  />
                </Link>
                <p className="mb-9 text-base leading-relaxed text-[#959CB1] dark:text-[#959CB1]-dark">
                  幣友科技，持續為您服務，提供最新的區塊鏈技術與數位資產資訊。
                </p>
                <div className="flex items-center">
                  <a
                    href="https://www.facebook.com/bityo.tw"
                    target="_blank"
                    className="mr-6 text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary">
                    <FontAwesomeIcon icon={faFacebookF} className='w-3' />
                  </a>

                  <a
                    href="https://www.instagram.com/bityo.tw/"
                    className="mr-6 text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary">
                    <FontAwesomeIcon icon={faInstagram} className='w-4' />
                  </a>

                  <a
                    href="https://www.tiktok.com/@bityo.tw"
                    className="mr-6 text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary">
                    <FontAwesomeIcon icon={faTiktok} className='w-4' />
                  </a>

                  <a
                    href="https://youtube.com/@bityo_tw"
                    className="mr-6 text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary">
                    <FontAwesomeIcon icon={faYoutube} className='w-4' />
                  </a>

                  <a
                    href="https://github.com/bityo-Official/"
                    target="_blank"
                    className="mr-6 text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary">
                    <FontAwesomeIcon icon={faGithub} className='w-4' />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  相關連結
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/market"
                      className="mb-4 inline-block text-base text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      市場行情
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="mb-4 inline-block text-base text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      社群
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/exchange"
                      className="mb-4 inline-block text-base text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      交易所
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="mb-4 inline-block text-base text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      關於我們
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  條款
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="pointer-events-none mb-4 inline-block text-base text-[#53596c] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      服務條款
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="pointer-events-none mb-4 inline-block text-base text-[#53596c] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      隱私權政策
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="pointer-events-none mb-4 inline-block text-base text-[#53596c] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      使用規範
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  幫助 & 支援
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/"
                      aria-disabled={true}
                      className="pointer-events-none mb-4 inline-block text-base text-[#53596c] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      幣友合夥人計畫
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="mb-4 inline-block text-base text-[#959CB1] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      關於我們
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="pointer-events-none mb-4 inline-block text-base text-[#53596c] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      聯絡我們
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/question"
                      className="pointer-events-none mb-4 inline-block text-base text-[#53596c] duration-300 hover:text-primary dark:text-[#959CB1]-dark dark:hover:text-primary"
                    >
                      常見問題
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="py-8">
            <p className="text-center text-base text-[#959CB1] dark:text-white">
              © 2024 幣友 Bityo. ｜ All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-14 z-[-1]">
          <svg
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
            <mask
              id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="url(#paint0_radial_94:899)"
              />
              <g opacity="0.8" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
