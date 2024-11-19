import { Banner, Text, Link } from "@nypl/design-system-react-components"

export type StatusType = "" | "failure" | "usernameFailure" | "success"

type StatusBannerProps = {
  status: StatusType
  statusMessage: string
}

export const StatusBanner = ({ status, statusMessage }: StatusBannerProps) => {
  const bannerContent = (
    <div style={{ alignItems: "center" }}>
      {status === "failure" ? (
        statusMessage !== "" ? (
          <Text marginBottom={0} color={"ui.black !important"}>
            {statusMessage} Please try again or{" "}
            <Link
              sx={{
                color: "ui.link.primary !important",
                textDecorationColor: "ui.link.primary !important",
                textDecoration: "underline",
              }}
              href="https://www.nypl.org/get-help/contact-us"
            >
              contact us
            </Link>{" "}
            for assistance.
          </Text>
        ) : (
          <Text marginBottom={0} color={"ui.black !important"}>
            Your changes were not saved.
          </Text>
        )
      ) : (
        <Text marginBottom={0} color={"ui.black !important"}>
          Your changes were saved.
        </Text>
      )}
    </div>
  )

  return (
    <Banner
      sx={{ marginTop: "m" }}
      isDismissible
      content={bannerContent}
      type={status === "failure" ? "negative" : "positive"}
    />
  )
}