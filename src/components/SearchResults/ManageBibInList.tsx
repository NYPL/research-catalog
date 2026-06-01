import { useContext, useEffect, useRef } from "react"
import { Button, Icon } from "@nypl/design-system-react-components"
import type SearchResultsBib from "../../models/SearchResultsBib"
import { appConfig } from "../../config/appConfig"
import { encodeURIComponentWithPeriods } from "../../utils/appUtils"
import type Bib from "../../models/Bib"
import { PatronDataContext } from "../../context/PatronDataContext"

interface ManageBibInListProps {
  bib: SearchResultsBib | Bib
  isAuthenticated: boolean
}

export const ManageBibInList = ({
  bib,
  isAuthenticated,
}: ManageBibInListProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { setUpdatedAccountData, updatedAccountData } =
    useContext(PatronDataContext)

  const onlyDefaultList = updatedAccountData.lists?.length === 1

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

  const handleSaveClick = (e: React.MouseEvent) => {
    // Intercept if not logged in
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
    if (onlyDefaultList) {
      try {
        const response = await fetch(`${BASE_URL}/api/account/lists/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patronId: patron.id.toString(),
            listName: `${list.listName.substring(0, 90)} (copy)`,
            description: list.description,
            records: list.records ? list.records.map((r) => r.uri) : [],
          }),
        })
        if (response.ok) {
          const data = await response.json()
          if (data && data.list) {
            setUpdatedAccountData({
              ...updatedAccountData,
              lists: [data.list, ...lists],
            })
          }
          setStatus("success")
          setStatusMessage("Your list has been duplicated.")
        } else {
          setStatus("failure")
          setStatusMessage("Your list could not be duplicated.")
        }
      } catch (error) {
        console.error("Error duplicating list:", error)
        setStatus("failure")
        setStatusMessage("Your list could not be duplicated.")
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
      {/* TODO: Update to bookmark/bookmark outlined icon */}
      <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="#0069BF"
            d="M17 3C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3H17ZM7 5V18L12 15.8203L17 18V5H7Z"
          />
        </svg>
      </Icon>
      Save
    </Button>
  )
}
