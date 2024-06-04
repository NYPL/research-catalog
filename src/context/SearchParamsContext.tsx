import React, { useState, createContext } from "react"

/**
 * Wrapper context component that controls state for the search keyword
 */
export const SearchParamsContext = createContext(null)

export const SearchParamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useState(null)

  return (
    <SearchParamsContext.Provider
      value={{
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </SearchParamsContext.Provider>
  )
}

/**
 * Custom hook to simplify accessing the value from SearchParamsContext.
 */
export const useSearchParamsContext = () => {
  const searchParamsContext = React.useContext(SearchParamsContext)
  if (searchParamsContext === undefined) {
    throw new Error(
      "Use `useSearchParamsContext` inside `SearchParamsProvider`."
    )
  }
  return searchParamsContext
}
