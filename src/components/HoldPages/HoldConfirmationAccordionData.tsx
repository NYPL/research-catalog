import {
  Text,
  type AccordionDataProps,
} from "@nypl/design-system-react-components"
import RCLink from "../Link/Link"

export const holdConfirmationFAQData: AccordionDataProps[] = [
  {
    label: "What's next?",
    panel: (
      <>
        <Text>
          Please allow a few minutes for this item to show up in your{" "}
          <RCLink href="/account">patron account</RCLink>.
        </Text>
        <Text>
          The item will be listed as &quot;Ready for pickup&quot; under your
          requests tab when it is available. You will receive an email
          confirmation after your item has arrived.
        </Text>
      </>
    ),
  },
  {
    label: "When will my item be ready for pickup?",
    panel: (
      <>
        <Text>
          <strong>Items stored on-site:</strong> Materials requested up to an
          hour before closing are usually ready for pickup within an hour.
          Materials requested within an hour of closing or outside business
          hours are ready about an hour after opening on the next business day.
        </Text>
        <Text>
          <strong>Items stored off-site:</strong> Materials requested before
          2:30 PM are usually ready for pickup about an hour after opening the
          next day (check{" "}
          <RCLink isExternal href="https://www.nypl.org/">
            nypl.org
          </RCLink>{" "}
          for library hours). Materials requested after 2:30 PM Mon–Thu are
          usually ready in two days; materials requested after 2:30 PM Fri–Sun
          are ready on Tuesday. Some materials are not delivered on Saturdays.
        </Text>
      </>
    ),
  },
  {
    label: "How long will my item be available for?",
    panel: (
      <>
        <Text>
          We will hold books for up to 14 days, so you can request materials up
          to two weeks in advance.
        </Text>
      </>
    ),
  },
  {
    label: "How do I pick up my item once it is ready?",
    panel: (
      <>
        <Text>
          Once your item is ready for pickup, please arrive at the pickup
          location during business hours and proceed to a help desk. An NYPL
          staff member will check your item out to you.
        </Text>
      </>
    ),
  },
  {
    label: "How do I cancel my request?",
    panel: (
      <>
        <Text>
          If you would like to cancel your request or have questions, please{" "}
          <RCLink
            isExternal
            href="https://gethelp.nypl.org/customer/portal/emails/new"
          >
            email us
          </RCLink>{" "}
          or call 917-ASK-NYPL (
          <RCLink isExternal href="tel:19172756975">
            917-275-6975
          </RCLink>
          ). Processed requests can also be canceled from the requests tab in
          your patron account.
        </Text>
        <Text>
          For more information about our requesting services, please see{" "}
          <RCLink
            isExternal
            href="https://www.nypl.org/research/services/request-materials"
          >
            Requesting Research Materials
          </RCLink>
          .
        </Text>
      </>
    ),
  },
]

export const eddConfirmationFAQData: AccordionDataProps[] = [
  {
    label: "What’s next?",
    panel: (
      <>
        <Text>
          You will receive an email when your item is available to download.
        </Text>
      </>
    ),
  },
  {
    label: "When will my item be available for download?",
    panel: (
      <>
        <Text>
          <Text as="span" fontWeight="medium">
            Items stored on-site:
          </Text>{" "}
          Requests will be typically filled as quickly as possible, but please
          be aware it may take up to two weeks (or longer, in cases where
          complex rights issues apply). Eligible materials from our Special
          Collections may take six to eight weeks to be delivered.
        </Text>
        <Text>
          <Text as="span" fontWeight="medium">
            Items stored off-site:
          </Text>{" "}
          Requests will be typically filled within 48 hours, but please be aware
          it may take up to two weeks (or longer, in cases where complex rights
          issues apply).
        </Text>
      </>
    ),
  },
  {
    label: "How long will my item be available for download?",
    panel: (
      <>
        <Text>
          Files will remain available to the user for 30 days. Once a file is
          retrieved, it remains available to the user for five days. Each file
          can be retrieved a maximum of five times.
        </Text>
        <RCLink
          isExternal
          href="https://www.nypl.org/research/services/scan-and-deliver"
        >
          Read more about this service.
        </RCLink>
      </>
    ),
  },
]
