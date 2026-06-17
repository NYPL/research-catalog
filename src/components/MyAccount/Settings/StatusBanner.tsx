import { Banner } from "@nypl/design-system-react-components"
import type { ReactElement } from "react"

export type StatusBannerState = {
  type: string
  message: ReactElement | string
  isMiniBanner?: boolean
}

export const StatusBanner = ({
  type,
  message,
  isMiniBanner = false,
}: StatusBannerState) => {
  return (
    <Banner
      isDismissible
      content={message}
      variant={type === "failure" ? "negative" : "positive"}
      sx={{
        ...(isMiniBanner && {
          paddingTop: "xs",
          paddingBottom: "xs",
          paddingLeft: "s !important",
          paddingRight: "m !important",
        }),
        alignContent: "center",
        color: "ui.body",
        a: { color: "ui.link.primary" },
      }}
    />
  )
}
