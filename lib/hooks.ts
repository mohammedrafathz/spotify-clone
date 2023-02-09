import useSWR from "swr";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher);

  return {
    user: data,
    loading: !data && !error,
    isError: error
  }
}

export const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher);

  console.log(error);
  
  return {
    playlists: (data as any) || [],
    loading: !data && !error,
    isError: error
  }
}