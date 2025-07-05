import PembayaranSPPImage from '@/assets/imgs/projects/pembayaran-spp.png';
import BlogHubPasienImage from '@/assets/imgs/projects/blog-hub-pasien.png';
import ReactionTimerImage from '@/assets/imgs/projects/reaction-timer.png';
import RPSGameImage from '@/assets/imgs/projects/rps-game.png';
import AplikasiKasirImage from '@/assets/imgs/projects/aplikasi-kasir.png';
import GetAnimeQuoteImage from '@/assets/imgs/projects/get-anime-quote.png';
import SkenMathImage from '@/assets/imgs/projects/skenmath.png';
import SejarahkuImage from '@/assets/imgs/projects/sejarahku.png';
import Erpeelone58Image from '@/assets/imgs/projects/erpeelone58.png';
import type { Project } from "~/models/project";

export const useProject = () => {
  const { t } = useI18n();

  return useState('Project', (): Project[] => [
    {
      cover: PembayaranSPPImage,
      name: t('project.pembayaran-spp.title'),
      description: t('project.pembayaran-spp.description'),
      tags: [{ name: 'PHP' }, { name: 'MySQL' }, { name: 'Bootstrap' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/aplikasi-pembayaran-spp' },
    },
    {
      cover: BlogHubPasienImage,
      name: t('project.blog-hub-pasien.title'),
      description: t('project.blog-hub-pasien.description'),
      tags: [{ name: 'Laravel' }, { name: 'MySQL' }, { name: 'TailwindCSS' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/blog-hub-pasien' },
    },
    {
      cover: ReactionTimerImage,
      name: t('project.reaction-timer.title'),
      description: t('project.reaction-timer.description'),
      tags: [{ name: 'Vue' }, { name: 'TailwindCSS' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/reaction-timer' },
      preview: { url: 'https://cecep-reaction-timer.vercel.app' },
    },
    {
      cover: RPSGameImage,
      name: t('project.rps-game.title'),
      description: t('project.rps-game.description'),
      tags: [{ name: 'HTML' }, { name: 'Javascript' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/rps-game' },
      preview: { url: 'https://adiiaryasutaa.github.io/rps-game' },
    },
    {
      cover: AplikasiKasirImage,
      name: t('project.aplikasi-kasir.title'),
      description: t('project.aplikasi-kasir.description'),
      tags: [{ name: 'Java' }, { name: 'Gson' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/aplikasi-kasir' },
    },
    {
      cover: GetAnimeQuoteImage,
      name: t('project.get-anime-quote.title'),
      description: t('project.get-anime-quote.description'),
      tags: [{ name: 'HTML' }, { name: 'Javascript' }, { name: 'API' }, { name: 'TailwindCSS' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/get-anime-quote' },
      preview: { url: 'https://getanimequote.vercel.app' },
    },
    {
      cover: SkenMathImage,
      name: t('project.skenmath.title'),
      description: t('project.skenmath.description'),
      tags: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'Javascript' }, { name: 'Bootstrap' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/skenmath' },
      preview: { url: 'https://skenmath.vercel.app' },
    },
    {
      cover: SejarahkuImage,
      name: t('project.sejarahku.title'),
      description: t('project.sejarahku.description'),
      tags: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'Javascript' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/sejarahku' },
      preview: { url: 'https://adiiaryasutaa.github.io/sejarahku' },
    },
    {
      cover: Erpeelone58Image,
      name: t('project.erpeelone-58.title'),
      description: t('project.erpeelone-58.description'),
      tags: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'Javascript' }, { name: 'Bootstrap' }],
      repository: { provider: 'github', url: 'https://github.com/adiiaryasutaa/erpeelone-58' },
      preview: { url: 'https://erpeelone58.vercel.app' },
    },
  ]);
};
