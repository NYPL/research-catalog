import { useContext, useEffect, useRef } from "react"
import { Button, Icon, Text } from "@nypl/design-system-react-components"
import type SearchResultsBib from "../../models/SearchResultsBib"
import { appConfig } from "../../config/appConfig"
import { encodeURIComponentWithPeriods } from "../../utils/appUtils"
import type Bib from "../../models/Bib"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"
import Link from "../Link/Link"
import type { List } from "../../types/listTypes"

interface ManageBibInListProps {
  bib: SearchResultsBib | Bib
  isAuthenticated: boolean
  setStatus
  setStatusMessage
}

export const ManageBibInList = ({
  bib,
  isAuthenticated,
  setStatus,
  setStatusMessage,
}: ManageBibInListProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)

  const onlyHasDefaultList = updatedAccountData?.lists?.length === 1

  const isSaved = updatedAccountData?.lists?.some((list) =>
    list.records?.some((record) => record.uri === bib.id)
  )
  const buttonText = isSaved
    ? onlyHasDefaultList
      ? "Remove"
      : "Manage"
    : "Save"

  const successRemoveDefault = (defaultListId) => (
    <Text marginBottom={0}>
      This record has been removed from{" "}
      <Link
        target="_blank"
        color="ui.link.primary !important"
        href={`/account/lists/${defaultListId}`}
      >
        My workspace (default list)
      </Link>
      . Lists can be managed from your{" "}
      <Link target="_blank" color="ui.link.primary !important" href="/account">
        patron account
      </Link>
      .
    </Text>
  )

  const successAddDefault = (defaultListId) => (
    <Text marginBottom={0}>
      This record has been saved to{" "}
      <Link
        target="_blank"
        color="ui.link.primary !important"
        href={`/account/lists/${defaultListId}`}
      >
        My workspace (default list)
      </Link>
      . Lists can be managed from your{" "}
      <Link target="_blank" color="ui.link.primary !important" href="/account">
        patron account
      </Link>
      .
    </Text>
  )
  // Focus the Save button upon returning from the login redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const focusTarget = params.get("focus")

    if (focusTarget === `manage-bib-${bib.id}`) {
      buttonRef.current?.focus()
      // Clean up the URL
      params.delete("focus")
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "") +
        window.location.hash

      window.history.replaceState({}, "", newUrl)
      //And open menu...
    }
  }, [bib.id])

  const handleSaveClick = async (e: React.MouseEvent) => {
    // Intercept if not logged in:
    if (!isAuthenticated) {
      e.preventDefault()

      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set("focus", `manage-bib-${bib.id}`)

      const loginEndpoint =
        appConfig.urls?.loginUrl?.[appConfig.environment] ||
        appConfig.apiEndpoints?.loginUrl?.[appConfig.environment]
      const encodedRedirect = encodeURIComponentWithPeriods(
        currentUrl.toString()
      )

      window.location.assign(`${loginEndpoint}?redirect_uri=${encodedRedirect}`)
      return
    }
    // If user has only the default list:
    if (onlyHasDefaultList) {
      const defaultList = updatedAccountData?.lists?.find(
        (list) => list.isDefaultList
      )
      const defaultListId = defaultList?.id

      try {
        const response = await fetch(
          `${BASE_URL}/api/account/lists/records?uris=${bib.id}`,
          {
            method: isSaved ? "DELETE" : "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patronId: updatedAccountData?.patron?.id?.toString(),
              listId: defaultListId,
            }),
          }
        )
        if (response.status === 200) {
          if (setUpdatedAccountData && updatedAccountData) {
            const updatedLists = updatedAccountData.lists.map((list) => {
              if (list.id === defaultListId) {
                if (isSaved) {
                  return {
                    ...list,
                    records:
                      list.records?.filter((r) => r.uri !== bib.id) || [],
                    recordCount: Math.max(0, (list.recordCount || 0) - 1),
                  }
                } else {
                  return {
                    ...list,
                    records: [{ uri: bib.id }, ...(list.records || [])],
                    recordCount: (list.recordCount || 0) + 1,
                  }
                }
              }
              return list
            })
            setUpdatedAccountData({
              ...updatedAccountData,
              lists: updatedLists as List[],
            })
          }
          setStatus("success")
          setStatusMessage(
            isSaved
              ? successRemoveDefault(defaultListId)
              : successAddDefault(defaultListId)
          )
        } else {
          setStatus("failure")
          setStatusMessage(
            `This record could not be ${isSaved ? "removed" : "saved"}.`
          )
        }
      } catch (error) {
        console.error(
          `Error ${isSaved ? "removing" : "adding"} record ${bib.id} ${
            isSaved ? "from" : "to"
          } list ${defaultListId}:`,
          error
        )
        setStatus("failure")
        setStatusMessage(
          `This record could not be ${isSaved ? "removed" : "saved"}.`
        )
      }
    }
  }

  return (
    <Button
      ref={buttonRef}
      id={`manage-bib-${bib.id}`}
      onClick={handleSaveClick}
      variant="text"
    >
      {/* TODO: Update to bookmark/bookmark outlined DS icon */}
      <Icon size="large">
        {isSaved ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#0069BF"
              d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#0069BF"
              d="M17 3C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3H17ZM7 5V18L12 15.8203L17 18V5H7Z"
            />
          </svg>
        )}
      </Icon>
      {buttonText}
    </Button>
  )
}
