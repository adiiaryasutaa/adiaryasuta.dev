export interface FriendSocial {
  platform: 'github' | 'linkedin' | 'instagram' | 'twitter'
  url: string
}

export interface Friend {
  photo: string
  name: string
  jobTitle: string
  socials: FriendSocial[]
}
