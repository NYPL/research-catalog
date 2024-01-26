import { useEffect, useState } from "react"
import Router from "next/router"

/**
 * The useLoading hook taps into the React router and returns a boolean isLoading
 * that is true whenever a route change is initialized and the data hasn't finished loading.
 */
const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadingStart = () => {
      setIsLoading(true)
    }
    const loadingEnd = () => {
      setIsLoading(false)
    }
    Router.events.on("routeChangeStart", loadingStart)
    Router.events.on("routeChangeComplete", loadingEnd)
    Router.events.on("routeChangeError", loadingEnd)
    return () => {
      Router.events.off("routeChangeStart", loadingStart)
      Router.events.off("routeChangeComplete", loadingEnd)
      Router.events.off("routeChangeError", loadingEnd)
    }
  }, [])

  return isLoading
}

export default useLoading
