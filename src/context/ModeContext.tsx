import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/router"

type Mode = "search" | "browse" | ""

interface ModeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext)
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("")

  useEffect(() => {
    const path = router.asPath

    if (path.includes("/search")) {
      setMode("search")
    } else if (path.includes("/browse") || path.includes("/sh-results")) {
      setMode("browse")
    }
  }, [router.asPath])

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}
