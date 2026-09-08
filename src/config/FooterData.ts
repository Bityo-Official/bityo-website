import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faTiktok } from '@fortawesome/free-brands-svg-icons/faTiktok';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';

const LinkData = [
  {
    title: '相關連結',
    itemList: [
      {
        title: '社群',
        link: '/community'
      },
      {
        title: '交易所',
        link: '/exchange'
      },
      {
        title: '關於我們',
        link: '/about'
      }
    ]
  },
  {
    title: '條款',
    itemList: [
      {
        title: '服務條款',
        link: '/',
        disabled: true
      },
      {
        title: '隱私權政策',
        link: '/',
        disabled: true
      },
      {
        title: '使用規範',
        link: '/',
        disabled: true
      }
    ]
  },
  {
    title: '幫助 & 支援',
    itemList: [
      {
        title: '幣友合夥人計畫',
        link: '/cooperate/partners'
      },
      {
        title: '聯絡我們',
        link: '/contact'
      },
      {
        title: '官方驗證',
        link: '/verify'
      },
      {
        title: '常見問題',
        link: '/question',
        disabled: true
      }
    ]
  },
  {
    title: '市場資料',
    itemList: [
      {
        title: '市場行情',
        link: '/market'
      },
      {
        title: '恐懼與貪婪指數',
        link: '/market/FearAndGreed'
      }
    ]
  },
  {
    title: '開發者',
    itemList: [
      {
        title: 'API',
        link: '/doc/api'
      }
    ]
  }
];

interface SocialIcon {
  link: string;
  icon: IconDefinition;
  size: string;
  label: string;
}

const IconData: SocialIcon[] = [
  {
    link: 'https://www.facebook.com/bityo.tw',
    icon: faFacebookF,
    size: 'w-3',
    label: 'Facebook'
  },
  {
    link: 'https://www.instagram.com/bityo.tw/',
    icon: faInstagram,
    size: 'w-4',
    label: 'Instagram'
  },
  {
    link: 'https://www.tiktok.com/@bityo.tw',
    icon: faTiktok,
    size: 'w-4',
    label: 'TikTok'
  },
  {
    // 原本是 'httphttps://youtube.com/@bityo_tw'，網址開頭壞掉
    link: 'https://youtube.com/@bityo_tw',
    icon: faYoutube,
    size: 'w-4',
    label: 'YouTube'
  },
  {
    link: 'https://github.com/bityo-Official',
    icon: faGithub,
    size: 'w-4',
    label: 'GitHub'
  },
  {
    link: 'https://discord.gg/bityo',
    icon: faDiscord,
    size: 'w-4',
    label: 'Discord'
  }
];

export { LinkData, IconData };