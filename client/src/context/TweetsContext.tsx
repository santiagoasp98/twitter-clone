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
  const [user, setUser] = useState<User | null>(null)

  const { username } = useParams()

  const { getUserByUsername } = useAuth()

  const [tweets, setTweets] = useState([])
  const [loadingTweets, setLoadingTweets] = useState(true)

  const fetchUser = useCallback(async () => {
    if (username) {
      setLoadingTweets(true)
      try {
        const user = await getUserByUsername(username)
        setUser(user)
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
      if (user) {
        const res = await getTweetsByUsernameRequest(user.username)
        setTweets(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingTweets(false)
    }
  }, [user])

  const prevUserRef = useRef(user)

  useEffect(() => {
    if (prevUserRef.current !== user) {
      fetchTweets()
    }
    prevUserRef.current = user
  }, [fetchTweets, user])

  return (
    <TweetsContext.Provider value={{ tweets, loadingTweets, fetchTweets }}>
      {children}
    </TweetsContext.Provider>
  )
}
