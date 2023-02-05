import fetcher from "./fetcher"


export const auth = (mode: "sigin" | "singup", body: { email: string, password: string }) => {
  return fetcher(`/${mode}`, body)
}