import { createContext, useState } from "react"

export const SearchResultsAggregationsContext = createContext(null)

export const SearchResultsAggregationsProvider = ({ children, value }) => {
  const [aggregations, setAggregations] = useState(value)
  return (
    <SearchResultsAggregationsContext.Provider
      value={{ aggregations, setAggregations }}
    >
      {children}
    </SearchResultsAggregationsContext.Provider>
  )
}
