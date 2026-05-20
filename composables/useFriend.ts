import type { Friend } from '@/models/friend'

export const useFriend = () => {
  return useState('friends', (): Friend[] => [
    {
      photo: 'https://placehold.co/80x80',
      name: 'Friend Name',
      jobTitle: 'Software Engineer',
      socials: [
        { platform: 'github', url: 'https://github.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
    },
    {
      photo: 'https://placehold.co/80x80',
      name: 'Friend Name',
      jobTitle: 'UI/UX Designer',
      socials: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
      ],
    },
    {
      photo: 'https://placehold.co/80x80',
      name: 'Friend Name',
      jobTitle: 'Mobile Developer',
      socials: [
        { platform: 'github', url: 'https://github.com' },
      ],
    },
  ])
}
