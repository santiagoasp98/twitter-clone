import { useContext } from 'react'
import { TweetsContext } from '../context/TweetsContext'

export const useTweets = () => {
  const context = useContext(TweetsContext)
  if (context === undefined) {
    throw new Error('useTweets must be used within an TweetsProvider')
  }
  return context
}
