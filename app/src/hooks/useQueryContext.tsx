import { useLocation } from 'react-router-dom'
import { EndpointTypes } from '../types/endpoints'

export default function useQueryContext() {
  const { search } = useLocation();
  console.log({ search });
  const { cluster } = search as any;

  const endpoint = cluster ? (cluster as EndpointTypes) : 'mainnet-beta'
  const hasClusterOption = endpoint !== 'mainnet-beta'
  const fmtUrlWithCluster = (url: string) => {
    if (hasClusterOption) {
      const mark = url.includes('?') ? '&' : '?'
      return decodeURIComponent(`${url}${mark}cluster=${endpoint}`)
    }
    return url
  }

  return {
    fmtUrlWithCluster,
  }
}
