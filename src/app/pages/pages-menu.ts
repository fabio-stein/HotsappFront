import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Chat',
    icon: 'comments',
    link: '/pages/chat'
  },
  {
    title: 'Bulk Messaging',
    icon: 'copy',
    link: '/pages/bulk_messaging'
  },
  {
    title: 'Numbers',
    icon: 'mobile-alt',
    children: [
      {
        title: 'My Numbers',
        link: '/pages/number/my'
      }, {
        title: 'Buy New',
        link: '/pages/number/buy'
      }
    ]
  },
  {
    title: 'Shop',
    icon: 'shopping-cart',
    children: [
      {
        title: 'Credits'
      },
      {
        title: 'Numbers'
      },
      {
        title: 'Messages'
      }
    ]
  },
  {
    title: 'Wallet',
    icon: 'wallet',
    link: '/pages/wallet',
  },
];
