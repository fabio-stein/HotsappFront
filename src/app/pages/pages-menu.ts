import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Atendimentos',
    icon: 'comments',
    link: '/pages/chat'
  },
  {
    title: 'Teste',
    icon: 'clipboard',
    children: [
      {
        title: 'Carteira',
        icon: 'wallet',
        link: '/pages/wallet',
      },
      {
        title: 'Empresa',
        icon: 'building',
        link: '/pages/company/config',
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
        title: 'Números',
        icon: 'mobile-alt',
        children: [
          {
            title: 'Meus Números',
            link: '/pages/number/my'
          }, {
            title: 'Adicionar Número',
            link: '/pages/number/connector'
          }, {
            title: 'Comprar Novo',
            link: '/pages/number/buy'
          }
        ]
      },
      {
        title: 'Campanhas',
        icon: 'clipboard',
        link: '/pages/campaign'
      },
    ]
  },
];
