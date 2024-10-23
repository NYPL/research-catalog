import React, { useState, createContext, type ReactNode } from "react"
import type {
  PatronDataContextType,
  MyAccountPatronData,
} from "../types/myAccountTypes"
import { BASE_URL } from "../config/constants"
/**
 * Wrapper context component that controls state for the PatronData component
 */
export const PatronDataContext = createContext<PatronDataContextType | null>(
  null
)

export const PatronDataProvider = ({
  children,
  value,
  testSpy,
}: {
  children: ReactNode
  value: MyAccountPatronData
  testSpy?: () => void
}) => {
  const [patronDataLoading, setPatronDataLoading] = useState(null)
  const [updatedAccountData, setUpdatedAccountData] = useState(value)
  const getMostUpdatedSierraAccountData = async () => {
    // this method is only invoked to test that this method is being called
    // during testing
    if (testSpy) testSpy()
    setPatronDataLoading(true)
    const resp = await fetch(
      `${BASE_URL}/api/account/${updatedAccountData.patron.id}`
    )
    const data = await resp.json()
    setUpdatedAccountData(JSON.parse(data))
    setPatronDataLoading(false)
  }

  return (
    <PatronDataContext.Provider
      value={{
        setPatronDataLoading,
        patronDataLoading,
        updatedAccountData,
        getMostUpdatedSierraAccountData,
        setUpdatedAccountData,
      }}
    >
      {children}
    </PatronDataContext.Provider>
  )
}
