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
import { getTweetsFromUser } from '@api/tweets'

interface TweetsContextType {
  tweets: Tweet[]
  loadingTweets: boolean
  fetchTweets: () => Promise<void>
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
  const { getUserByUsername } = useAuth()
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

  return (
    <TweetsContext.Provider value={{ tweets, loadingTweets, fetchTweets }}>
      {children}
    </TweetsContext.Provider>
  )
}
