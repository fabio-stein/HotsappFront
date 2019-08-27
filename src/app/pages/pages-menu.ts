import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Channels',
    icon: 'list',
    link: 'channel',
  },
  {
    title: 'Others',
    children:
      [
        {
          title: 'Musics',
          link: 'musics',
        },
        {
          title: 'Youtube',
          link: 'youtube',
        },
      ],
  },
  {
    title: 'Profile',
    link: '/pages/profile',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
