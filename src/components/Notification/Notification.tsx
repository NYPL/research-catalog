import {
  Heading,
  Notification as DSNotification,
} from "@nypl/design-system-react-components"

/**
 * Custom RC Notification component that internally uses the DS `Notification`
 * component. The header level and aria-label are intentionally hard-coded.
 * For now, this notification should only display on the home and search result
 * pages and that is controlled in the `Layout` component.
 */
const Notification = ({ notification = "" }) => {
  if (!notification) return null

  return (
    <DSNotification
      aria-label="Research Catalog Alert"
      notificationHeading={
        <Heading level="h2">New Service Announcement</Heading>
      }
      notificationContent={
        <div dangerouslySetInnerHTML={{ __html: notification }} />
      }
      notificationType="announcement"
      noMargin
      maxWidth="1248px"
      marginTop="l"
      mx="auto"
    />
  )
}

export default Notification
