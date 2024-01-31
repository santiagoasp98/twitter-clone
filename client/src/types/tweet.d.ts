import { User } from '@myTypes/auth'

export interface Tweet {
  _id: string
  content: string
  author: User
  tweetedAt: string
  likes: string[]
}

export interface CreateTweet {
  content: string
  author: string
}

export interface UpdateTweet {
  content: string
}
