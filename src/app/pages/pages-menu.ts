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
  },/*
  {
    title: 'Bulk Messaging',
    icon: 'copy',
    link: '/pages/bulk_messaging'
  },*/
  {
    title: 'Números',
    icon: 'mobile-alt',
    children: [
      {
        title: 'Meus Números',
        link: '/pages/number/my'
      }, {
        title: 'Adicionar Número',
        link: '/pages/number/connector'
      }/*, {
        title: 'Comprar Novo',
        link: '/pages/number/buy'
      }*/
    ]
  },
  {
    title: 'Assinatura',
    icon: 'credit-card',
    children: [
      {
        title: 'Minha Assinatura',
        link: '/pages/subscription'
      },
      {
        title: 'Planos',
        link: '/pages/subscription/plans'
      }
    ]
  },
  {
    title: 'Wallet',
    icon: 'wallet',
    link: '/pages/wallet',
  },
];
