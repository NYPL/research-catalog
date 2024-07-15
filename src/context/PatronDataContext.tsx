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
}: {
  children: ReactNode
  value: MyAccountPatronData
}) => {
  const [updatedAccountData, setUpdatedAccountData] = useState(value)
  const getMostUpdatedSierraAccountData = async () => {
    const resp = await fetch(
      `${BASE_URL}/api/account/${updatedAccountData.patron.id}`
    )
    const data = await resp.json()
    // setTimeout(() => {
    setUpdatedAccountData(JSON.parse(data))
    // }, 2000)
  }

  return (
    <PatronDataContext.Provider
      value={{
        updatedAccountData,
        getMostUpdatedSierraAccountData,
        setUpdatedAccountData,
      }}
    >
      {children}
    </PatronDataContext.Provider>
  )
}
