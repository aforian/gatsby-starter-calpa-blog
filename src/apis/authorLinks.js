import { config } from '../../data';
import { IconName } from '../components/Icon';

const { githubUsername, website } = config;

export const authorsLinks = [
  {
    icon: IconName.Medium,
    href: 'https://medium.com/@alexian853',
    title: 'Medium',
  },
  {
    icon: IconName.Github,
    href: `https://github.com/${githubUsername}`,
    title: 'Github',
  },
  {
    icon: IconName.Codepen,
    href: 'https://codepen.io/alexian',
    title: 'Codepen',
  },
  { icon: IconName.Portfolio, href: website, title: 'Portfolio' },
];
