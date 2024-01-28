export interface Tweet {
  _id: string
  content: string
  author: string
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
