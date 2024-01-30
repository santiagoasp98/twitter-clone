import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
} from 'react'
import { Tweet } from '../types/tweet'
import { User } from '../types/auth'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getTweetsByUsernameRequest } from '../api/tweets'

interface TweetsContextType {
  tweets: Tweet[]
  tweetsOwner: User | null
  loadingTweets: boolean
  isTweetsOwner: boolean
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
  const { user: loggedInUser, getUserByUsername } = useAuth()

  const [tweets, setTweets] = useState([])
  const [loadingTweets, setLoadingTweets] = useState(true)
  const [isTweetsOwner, setIsTweetsOwner] = useState(false)

  const fetchUser = useCallback(async () => {
    if (username) {
      setLoadingTweets(true)
      try {
        const tweetsOwner = await getUserByUsername(username)
        setTweetsOwner(tweetsOwner)
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
    // setLoadingTweets(true)
    try {
      if (tweetsOwner) {
        const res = await getTweetsByUsernameRequest(tweetsOwner.username)
        setTweets(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingTweets(false)
    }
  }, [tweetsOwner])

  const prevUserRef = useRef(tweetsOwner)

  useEffect(() => {
    if (prevUserRef.current !== tweetsOwner) {
      fetchTweets()
    }
    prevUserRef.current = tweetsOwner
  }, [fetchTweets, tweetsOwner])

  useEffect(() => {
    if (loggedInUser && username) {
      setIsTweetsOwner(loggedInUser.username === username)
    }
  }, [loggedInUser, username])

  return (
    <TweetsContext.Provider
      value={{ tweets, tweetsOwner, loadingTweets, isTweetsOwner, fetchTweets }}
    >
      {children}
    </TweetsContext.Provider>
  )
}
