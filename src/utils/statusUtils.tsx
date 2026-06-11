import { Text } from "@nypl/design-system-react-components"
import Link from "../components/Link/Link"
import type { StatusBannerState } from "../components/MyAccount/Settings/StatusBanner"

export type StaticStatusKey =
  | "duplicateListSuccess"
  | "duplicateListFailure"
  | "deleteListSuccess"
  | "deleteListFailure"
  | "saveRecordFailure"
  | "listChangesSuccess"
  | "listChangesFailure"
  | "removeRecordFailure"
  | "accountSuccess"
  | "accountFailure"
  | "createListSuccess"
  | "createListFailure"
  | "passwordIncorrectFailure"
  | "passwordInvalidFailure"
  | "usernameFailure"

export const STATIC_STATUS_MESSAGES: Record<
  StaticStatusKey,
  StatusBannerState
> = {
  duplicateListSuccess: {
    type: "success",
    message: <Text marginBottom={0}>Your list has been duplicated.</Text>,
  },
  duplicateListFailure: {
    type: "failure",
    message: <Text marginBottom={0}>Your list could not be duplicated.</Text>,
  },
  deleteListSuccess: {
    type: "success",
    message: <Text marginBottom={0}>Your list has been deleted.</Text>,
  },
  deleteListFailure: {
    type: "failure",
    message: <Text marginBottom={0}>Your list could not be deleted.</Text>,
  },
  createListSuccess: {
    type: "success",
    message: <Text marginBottom={0}>List created.</Text>,
  },
  createListFailure: {
    type: "failure",
    message: <Text marginBottom={0}>List creation failed. Try again.</Text>,
  },
  listChangesSuccess: {
    type: "success",
    message: (
      <Text marginBottom={0}>
        Your list changes have been saved. Lists can be managed from your{" "}
        <Link href="/account/lists">patron account.</Link>
      </Text>
    ),
  },
  listChangesFailure: {
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
  saveRecordFailure: {
    type: "failure",
    message: <Text marginBottom={0}>This record could not be saved.</Text>,
  },
  removeRecordFailure: {
    type: "failure",
    message: <Text marginBottom={0}>This record could not be removed.</Text>,
  },
  accountSuccess: {
    type: "success",
    message: <Text marginBottom={0}>Your changes were saved.</Text>,
  },
  accountFailure: {
    type: "failure",
    message: (
      <Text marginBottom={0}>
        Your changes could not be saved. Please try again or{" "}
        <Link isExternal href="https://www.nypl.org/get-help/contact-us">
          contact us
        </Link>{" "}
        for assistance.
      </Text>
    ),
  },
  passwordIncorrectFailure: {
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
  passwordInvalidFailure: {
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
  usernameFailure: {
    type: "failure",
    message: (
      <Text marginBottom={0}>
        This username already exists. Please try again or{" "}
        <Link isExternal href="https://www.nypl.org/get-help/contact-us">
          contact us
        </Link>{" "}
        for assistance.
      </Text>
    ),
  },
}

// Statii that require a param to set a linked value.
export type DynamicStatusKey =
  | "saveRecordSuccess"
  | "removeRecordSuccess"
  | "accountSpecificFailure"

export const DYNAMIC_STATUS_MESSAGES: Record<
  DynamicStatusKey,
  (param: string) => StatusBannerState
> = {
  saveRecordSuccess: (listId: string) => ({
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
  removeRecordSuccess: (listId: string) => ({
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
  accountSpecificFailure: (message: string) => ({
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
