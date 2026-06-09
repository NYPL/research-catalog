import { Banner } from "@nypl/design-system-react-components"
import type { ReactElement } from "react"

export type StatusBannerState = {
  type: string
  message: ReactElement | string
}

export const StatusBanner = ({ type, message }: StatusBannerState) => {
  return (
    <Banner
      isDismissible
      content={message}
      variant={type === "failure" ? "negative" : "positive"}
      sx={{
        alignContent: "center",
        color: "ui.body",
        a: { color: "ui.link.primary" },
      }}
    />
  )
}
