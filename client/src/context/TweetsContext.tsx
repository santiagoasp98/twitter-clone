import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
} from 'react'
import { useParams } from 'react-router-dom'

import { Tweet } from '@myTypes/tweet'
import { User } from '@myTypes/auth'
import { useAuth } from '@hooks/useAuth'
import {
  getTweetsFromUser,
  likeTweetRequest,
  unlikeTweetRequest,
} from '@api/tweets'

interface TweetsContextType {
  tweets: Tweet[]
  loadingTweets: boolean
  fetchTweets: () => Promise<void>
  likeTweet: (tweetId: string, userId: string) => void
  unlikeTweet: (tweetId: string, userId: string) => void
}

interface TweetsContextProps {
  children: ReactNode
}

export const TweetsContext = createContext<TweetsContextType | undefined>(
  undefined,
)

export const TweetsProvider: React.FC<TweetsContextProps> = ({ children }) => {
  const [tweetsOwner, setTweetsOwner] = useState<User | null>(null)
  const { username } = useParams()
  const { user, getUserByUsername, token } = useAuth()
  const prevUserRef = useRef(tweetsOwner)

  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loadingTweets, setLoadingTweets] = useState(true)

  const fetchUser = useCallback(async () => {
    if (username) {
      setLoadingTweets(true)
      try {
        setTweetsOwner(await getUserByUsername(username))
      } catch (err) {
        console.log('Error getting the user: ', err)
      } finally {
        setLoadingTweets(false)
      }
    }
  }, [username, getUserByUsername])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  /********************************/

  const fetchTweets = useCallback(async () => {
    try {
      if (tweetsOwner) {
        const res = await getTweetsFromUser(tweetsOwner.id)
        setTweets(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingTweets(false)
    }
  }, [tweetsOwner])

  useEffect(() => {
    if (prevUserRef.current !== tweetsOwner) {
      fetchTweets()
    }
    prevUserRef.current = tweetsOwner
  }, [fetchTweets, tweetsOwner])

  /*******************************/

  const likeTweet = async (tweetId: string) => {
    try {
      if (user) {
        const response = await likeTweetRequest(tweetId, user.id, token)
        const likedTweet: Tweet = response.data
        const newTweets = tweets.map((tweet) => {
          if (tweet._id === tweetId) {
            return likedTweet
          }
          return tweet
        })

        setTweets(newTweets)
      }
    } catch (error) {
      console.log('Error trying to like the tweet: ', error)
    }
  }

  const unlikeTweet = async (tweetId: string) => {
    try {
      if (user) {
        const response = await unlikeTweetRequest(tweetId, user.id, token)
        const newTweets = tweets.map((tweet) => {
          if (tweet._id === tweetId) {
            return response.data
          }
          return tweet
        })

        setTweets(newTweets)
      }
    } catch (error) {
      console.log('Error trying to unlike the tweet: ', error)
    }
  }

  return (
    <TweetsContext.Provider
      value={{ tweets, loadingTweets, fetchTweets, likeTweet, unlikeTweet }}
    >
      {children}
    </TweetsContext.Provider>
  )
}
