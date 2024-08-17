import { LocaleKeys } from '@/types/locales'

export const getMenuItems = (dictionary: LocaleKeys) => [
  { title: dictionary.Home, link: '/' },
  {
    title: dictionary.Blockchain,
    link: undefined,
    subItems: [
      { title: 'Blocks', link: '/block' },
      { title: 'Uncles', link: '/uncles' },
      { title: 'Reorgs', link: '/reorgs' },
      { title: 'Transactions', link: '/transaction' },
      { title: 'Transactions Pending', link: '/transaction/pending' },
      { title: 'Verified Contract', link: '/verified-contracts' },
    ],
  },
  {
    title: dictionary.Token,
    link: undefined,
    subItems: [
      { title: 'All', link: '/token' },
      { title: 'Pools', link: '/pools-address' },
    ],
  },
  {
    title: 'APIs',
    link: undefined,
    subItems: [
      { title: 'API 1', link: '#!' },
      { title: 'API 2', link: '#!' },
      { title: 'API 3', link: '#!' },
    ],
  },
]
