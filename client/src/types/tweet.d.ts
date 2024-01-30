import { User } from './auth'

export interface Tweet {
  _id: string
  content: string
  author: User
  tweetedAt: string
  likesCount: number
}

export interface CreateTweet {
  content: string
  author: string
}

export interface UpdateTweet {
  content: string
}
