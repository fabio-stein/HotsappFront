import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Single Message',
    icon: 'envelope',
    link: '/pages/single_message'
  },
  {
    title: 'Chat',
    icon: 'comments',
    link: '/pages/chat'
  },
  {
    title: 'Numbers',
    icon: 'mobile-alt',
    children:[
      {
        title: 'My Numbers',
        link: '/pages/number/my'
      },{
        title: 'Buy New',
        link: '/pages/number/buy'
      }
    ]
  },
  {
    title: 'Wallet',
    icon: 'wallet',
    link: '/pages/wallet',
  },
];
