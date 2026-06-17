import { useContext, useEffect, useRef, useState } from "react"
import {
  Button,
  Icon,
  Box,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components"
import { appConfig } from "../../config/appConfig"
import { encodeURIComponentWithPeriods } from "../../utils/appUtils"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"
import type { List } from "../../types/listTypes"
import {
  Popover,
  PopoverTrigger,
  useDisclosure,
  Drawer,
  DrawerOverlay,
} from "@chakra-ui/react"
import { ManageBibInListMenu } from "./ManageBibInListMenu"
import {
  DYNAMIC_STATUS_MESSAGES,
  STATIC_STATUS_MESSAGES,
} from "../../utils/statusUtils"
import { idConstants, useFocusContext } from "../../context/FocusContext"

interface ManageBibInListProps {
  recordId: string
  isAuthenticated: boolean
  setStatus
  // If true, display different content and direct focus to account banner
  inAccount?: boolean
}

/* Render button to indicate saved state of bib and open list management menu.
 * Redirects to login if necessary. */
export const ManageBibInList = ({
  recordId,
  isAuthenticated,
  setStatus,
  inAccount = false,
}: ManageBibInListProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { setPersistentFocus } = useFocusContext()

  const { isLargerThanLargeMobile } = useNYPLBreakpoints()
  const isMobile = !isLargerThanLargeMobile
  const onlyHasDefaultList = updatedAccountData?.lists?.length === 1

  const isSaved = updatedAccountData?.lists?.some((list) =>
    list.records?.some((record) => record.uri === recordId)
  )
  const buttonText = isSaved
    ? onlyHasDefaultList
      ? "Remove"
      : "Manage"
    : "Save"

  // Manage bib menu state
  const { isOpen, onOpen, onClose } = useDisclosure()

  const popoverBaseId = `manage-bib-${recordId}`
  const triggerId = `popover-trigger-${popoverBaseId}`

  // Focus the Save button upon returning from the login redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const focusTarget = params.get("focus")

    if (focusTarget === triggerId) {
      setPersistentFocus(triggerId)
      // Clean up the URL
      params.delete("focus")
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "") +
        window.location.hash

      window.history.replaceState({}, "", newUrl)
      // And open menu
      if (!onlyHasDefaultList) {
        onOpen()
      }
    }
  }, [recordId, onOpen, onlyHasDefaultList, triggerId])

  const handleSaveClick = async (e: React.MouseEvent) => {
    // Intercept if not logged in:
    if (!isAuthenticated) {
      e.preventDefault()

      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set("focus", triggerId)

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
      setStatus(null)
      setIsLoading(true)

      try {
        const response = await fetch(
          `${BASE_URL}/api/account/lists/records?uris=${recordId}`,
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
        if (response.ok) {
          const responseData = await response.json()
          const updatedList = responseData.list || responseData

          setUpdatedAccountData((prevData: any) => {
            const data = prevData || updatedAccountData
            if (!data || !data.lists) return data
            const updatedLists = data.lists.map((list: List) => {
              if (list.id === defaultListId) {
                return { ...list, ...updatedList }
              }
              return list
            })

            return { ...data, lists: updatedLists as List[] }
          })
          setStatus(
            isSaved
              ? DYNAMIC_STATUS_MESSAGES.removeRecordSuccess(defaultListId)
              : DYNAMIC_STATUS_MESSAGES.saveRecordSuccess(defaultListId)
          )
        } else {
          setStatus(
            isSaved
              ? STATIC_STATUS_MESSAGES.removeRecordFailure
              : STATIC_STATUS_MESSAGES.saveRecordFailure
          )
        }
      } catch (error) {
        console.error(
          `Error ${isSaved ? "removing" : "adding"} record ${recordId} ${
            isSaved ? "from" : "to"
          } list ${defaultListId}:`,
          error
        )
        setStatus(
          isSaved
            ? STATIC_STATUS_MESSAGES.removeRecordFailure
            : STATIC_STATUS_MESSAGES.saveRecordFailure
        )
      } finally {
        setIsLoading(false)
        setPersistentFocus(`${idConstants.listStatusBanner}-${recordId}`)
      }
    } else {
      onOpen()
    }
  }

  const triggerButton = (
    <Button
      id={triggerId}
      onClick={handleSaveClick}
      variant="text"
      isDisabled={isLoading}
      sx={{
        width: "fit-content",
        padding: "8px",
        marginLeft: "auto",
        ...(isOpen && {
          bg: "ui.link.primary-05",
          _dark: {
            bg: "dark.ui.bg.hover",
          },
        }),
      }}
    >
      <Icon
        size="large"
        name={isSaved ? "contentBookmark" : "contentBookmarkOutline"}
      />
      <Box
        as="span"
        display={{ base: "none", md: "inline-block" }}
        textAlign="left"
      >
        {buttonText}
      </Box>
    </Button>
  )

  if (isMobile) {
    return (
      <>
        {triggerButton}
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom"
          returnFocusOnClose={false}
        >
          <DrawerOverlay />
          <ManageBibInListMenu
            isOpen={isOpen}
            onClose={onClose}
            setStatus={setStatus}
            recordId={recordId}
            isMobile={isMobile}
            inAccount={inAccount}
          />
        </Drawer>
      </>
    )
  }

  return (
    <Popover
      id={popoverBaseId}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-end"
      flip={false}
      isLazy
      strategy="fixed"
      closeOnBlur={false}
    >
      <PopoverTrigger>{triggerButton}</PopoverTrigger>
      <ManageBibInListMenu
        isOpen={isOpen}
        onClose={onClose}
        setStatus={setStatus}
        recordId={recordId}
        isMobile={isMobile}
        inAccount={inAccount}
      />
    </Popover>
  )
}
