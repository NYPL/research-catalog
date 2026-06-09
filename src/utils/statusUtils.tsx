import { Text } from "@nypl/design-system-react-components"
import Link from "../components/Link/Link"
import type { StatusBannerState } from "../components/MyAccount/Settings/StatusBanner"

export type StaticStatusKey =
  | "duplicate-list-success"
  | "duplicate-list-failure"
  | "delete-list-success"
  | "delete-list-failure"
  | "save-record-failure"
  | "list-changes-success"
  | "list-changes-failure"
  | "remove-record-failure"
  | "account-success"
  | "account-failure"
  | "create-list-success"
  | "create-list-failure"
  | "password-incorrect-failure"
  | "password-invalid-failure"

export const STATIC_STATUS_MESSAGES: Record<
  StaticStatusKey,
  StatusBannerState
> = {
  "duplicate-list-success": {
    type: "success",
    message: <Text marginBottom={0}>Your list has been duplicated.</Text>,
  },
  "duplicate-list-failure": {
    type: "failure",
    message: <Text marginBottom={0}>Your list could not be duplicated.</Text>,
  },
  "delete-list-success": {
    type: "success",
    message: <Text marginBottom={0}>Your list has been deleted.</Text>,
  },
  "delete-list-failure": {
    type: "failure",
    message: <Text marginBottom={0}>Your list could not be deleted.</Text>,
  },
  "create-list-success": {
    type: "success",
    message: <Text marginBottom={0}>List created.</Text>,
  },
  "create-list-failure": {
    type: "failure",
    message: <Text marginBottom={0}>List creation failed. Try again.</Text>,
  },
  "list-changes-success": {
    type: "success",
    message: (
      <Text marginBottom={0}>
        Your list changes have been saved. Lists can be managed from your{" "}
        <Link href="/account/lists">patron account.</Link>
      </Text>
    ),
  },
  "list-changes-failure": {
    type: "failure",
    message: (
      <Text>
        Your list changes could not be saved. Try again or{" "}
        <Link isExternal href="https://www.nypl.org/get-help/contact-us">
          contact us
        </Link>{" "}
        for assistance. Lists can be managed from your{" "}
        <Link href="/account/lists">patron account.</Link>
      </Text>
    ),
  },
  "save-record-failure": {
    type: "failure",
    message: <Text marginBottom={0}>This record could not be saved.</Text>,
  },
  "remove-record-failure": {
    type: "failure",
    message: <Text marginBottom={0}>This record could not be removed.</Text>,
  },
  "account-success": {
    type: "success",
    message: <Text marginBottom={0}>Your changes were saved.</Text>,
  },
  "account-failure": {
    type: "failure",
    message: <Text marginBottom={0}>Your changes were not saved.</Text>,
  },
  "password-incorrect-failure": {
    type: "failure",
    message: (
      <Text marginBottom={0}>
        Incorrect current pin/password. Please try again or{" "}
        <Link isExternal href="https://www.nypl.org/get-help/contact-us">
          contact us
        </Link>{" "}
        for assistance.
      </Text>
    ),
  },
  "password-invalid-failure": {
    type: "failure",
    message: (
      <Text marginBottom={0}>
        Invalid new pin/password. Please try again or{" "}
        <Link isExternal href="https://www.nypl.org/get-help/contact-us">
          contact us
        </Link>{" "}
        for assistance.
      </Text>
    ),
  },
}

export type DynamicStatusKey =
  | "save-record-success"
  | "remove-record-success"
  | "account-specific-failure"

export const DYNAMIC_STATUS_MESSAGES: Record<
  DynamicStatusKey,
  (param: string) => StatusBannerState
> = {
  "save-record-success": (listId: string) => ({
    type: "success",
    message: (
      <Text marginBottom={0}>
        This record has been saved to{" "}
        <Link
          target="_blank"
          color="ui.link.primary !important"
          href={`/account/lists/${listId}`}
        >
          My workspace (default list)
        </Link>
        . Lists can be managed from your{" "}
        <Link
          target="_blank"
          color="ui.link.primary !important"
          href="/account/lists"
        >
          patron account
        </Link>
        .
      </Text>
    ),
  }),
  "remove-record-success": (listId: string) => ({
    type: "success",
    message: (
      <Text marginBottom={0}>
        This record has been removed from{" "}
        <Link
          target="_blank"
          color="ui.link.primary !important"
          href={`/account/lists/${listId}`}
        >
          My workspace (default list)
        </Link>
        . Lists can be managed from your{" "}
        <Link
          target="_blank"
          color="ui.link.primary !important"
          href="/account/lists"
        >
          patron account
        </Link>
        .
      </Text>
    ),
  }),
  "account-specific-failure": (message: string) => ({
    type: "failure",
    message: (
      <Text marginBottom={0}>
        {message} Please try again or{" "}
        <Link href="https://www.nypl.org/get-help/contact-us">contact us</Link>{" "}
        for assistance.
      </Text>
    ),
  }),
}
