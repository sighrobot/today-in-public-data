import React from 'react'
import { fetchData } from '../utils'

export default ({
  date = new Date().toISOString().slice(0, 10),
  sources = [],
  board,
} = {}) => {
  const [data, setData] = React.useState([])

  React.useEffect(async () => {
    if (board && sources.length > 0) {
      const { body } = await fetchData(date, sources, board)
      setData(body)
    }
  }, [date, JSON.stringify(sources), board])

  return { data }
}
