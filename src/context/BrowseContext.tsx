import { createContext, useContext, useState } from "react"
import type { BrowseType } from "../types/browseTypes"

interface BrowseContextType {
  browseType: BrowseType
  setBrowseType: (type: BrowseType) => void
}

const BrowseContext = createContext<BrowseContextType | undefined>(undefined)

export const BrowseProvider = ({ children }: { children: React.ReactNode }) => {
  const [browseType, setBrowseType] = useState<BrowseType>("subjects")

  return (
    <BrowseContext.Provider
      value={{
        browseType,
        setBrowseType,
      }}
    >
      {children}
    </BrowseContext.Provider>
  )
}

export const useBrowseContext = (): BrowseContextType => {
  const context = useContext(BrowseContext)
  if (!context) {
    throw new Error("useBrowseContext must be used within BrowseProvider")
  }
  return context
}
