import { Banner } from "@nypl/design-system-react-components"
import type { ReactElement } from "react"

export type StatusBannerState = {
  type: string
  message: ReactElement | string
  isDismissible?: boolean
  isMiniBanner?: boolean
}

export const StatusBanner = ({
  type,
  message,
  isDismissible = true,
  isMiniBanner = false,
}: StatusBannerState) => {
  return (
    <Banner
      isDismissible={isDismissible}
      content={message}
      variant={type === "failure" ? "negative" : "positive"}
      sx={{
        ...(isMiniBanner && {
          paddingTop: "xs",
          paddingBottom: "xs",
          paddingLeft: "s !important",
          paddingRight: "36px !important",
        }),
        alignContent: "center",
        color: "ui.body",
        a: { color: "ui.link.primary" },
      }}
    />
  )
}
