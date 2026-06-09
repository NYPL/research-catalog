import { Banner, Text, Link } from "@nypl/design-system-react-components"

export type StatusType = "" | "failure" | "usernameFailure" | "success"

type StatusBannerProps = {
  status: StatusType
  statusMessage: string
}

const generalSuccessContent = <Text>Your changes were saved.</Text>

const generalFailureContent = <Text>Your changes were not saved.</Text>

const specificFailureContent = (statusMessage: string) => {
  return (
    <Text marginBottom={0}>
      {statusMessage} Please try again or{" "}
      <Link
        color="ui.link.primary !important"
        href="https://www.nypl.org/get-help/contact-us"
      >
        contact us
      </Link>{" "}
      for assistance.
    </Text>
  )
}

const specificSuccessContent = (statusMessage: string) => {
  return <Text marginBottom={0}>{statusMessage}</Text>
}

const statusContent = (status, statusMessage) => {
  if (status === "success") {
    if (statusMessage !== "") {
      return specificSuccessContent(statusMessage)
    } else {
      return generalSuccessContent
    }
  }
  if (status === "failure" && statusMessage !== "") {
    return specificFailureContent(statusMessage)
  } else {
    return generalFailureContent
  }
}

export const StatusBanner = ({ status, statusMessage }: StatusBannerProps) => {
  return (
    <Banner
      isDismissible
      content={
        <div style={{ alignItems: "center" }}>
          {statusContent(status, statusMessage)}
        </div>
      }
      variant={status === "failure" ? "negative" : "positive"}
    />
  )
}
