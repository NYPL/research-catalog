import type { RCPage } from "@/config/types"

export const getActivePage = (pathname: string): RCPage => {
  if (pathname === "/") {
    return "search"
  } else if (pathname.includes("subject_headings")) {
    return "shep"
  } else if (pathname.includes("account")) {
    return "account"
  } else {
    return ""
  }
}
