import axios from 'axios'
import useSWR from 'swr'

interface IAxiosFetcher {
  url: string
  token: string
}

const fetcher = ({ url, token }: IAxiosFetcher) =>
  axios.get(url, { headers: { Authorization: token } }).then((res) => res.data)

export const useTransactionHistory = (token: string | null) => {
  const { data, error } = useSWR(
    {
      url: `http://localhost:3001/transactions/user`,
      token
    } as IAxiosFetcher,
    fetcher
  )

  return {
    data,
    isError: error
  }
}
