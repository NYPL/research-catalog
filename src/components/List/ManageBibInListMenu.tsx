import {
  Button,
  Icon,
  Flex,
  Form,
  FormField,
  TextInput,
  Heading,
  Box,
} from "@nypl/design-system-react-components"
import {
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@chakra-ui/react"
import FocusLock from "react-focus-lock"
import { useContext, useState, useEffect } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"
import { SearchableCheckboxGroup } from "./SearchableCheckboxGroup"
import { STATIC_STATUS_MESSAGES } from "../../utils/statusUtils"
import { StatusBanner } from "../MyAccount/Settings/StatusBanner"
import type { StatusBannerState } from "../MyAccount/Settings/StatusBanner"
import { idConstants, useFocusContext } from "../../context/FocusContext"

/** Render list management menu (inside Chakra Popover, Drawer on mobile) */
export const ManageBibInListMenu = ({
  isOpen,
  onClose,
  list,
  setStatus,
  recordId,
  isMobile,
  inAccount = false,
  initialFocusRef,
}: {
  isOpen: boolean
  onClose: () => void
  list?: any
  setStatus: any
  recordId: string
  isMobile?: boolean
  inAccount?: boolean
  initialFocusRef?: any
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const patron = updatedAccountData?.patron
  const lists = updatedAccountData?.lists || []
  const { setPersistentFocus } = useFocusContext()

  // Create list form status banner
  const [listCreationStatus, setListCreationStatus] =
    useState<StatusBannerState | null>(null)

  const [listName, setListName] = useState(list?.listName || "")
  const [debouncedListName, setDebouncedListName] = useState(
    list?.listName || ""
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedLists, setSelectedLists] = useState<string[]>(
    lists
      ?.filter((l: any) =>
        l.records?.some((record: any) => record.uri === recordId)
      )
      .map((l: any) => l.id) || []
  )

  // Reset whole menu state on open
  useEffect(() => {
    if (isOpen) {
      setStatus(null)
      setListName(list?.listName || "")
      setDebouncedListName(list?.listName || "")
      setShowCreateForm(false)
      setListCreationStatus(null)
      setSelectedLists(
        lists
          ?.filter((l: any) =>
            l.records?.some((record: any) => record.uri === recordId)
          )
          .map((l: any) => l.id) || []
      )
    }
  }, [isOpen, list, recordId])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedListName(listName), 1000)
    return () => clearTimeout(timer)
  }, [listName])

  // Focus the "Create new list" button when popover opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const btn = document.getElementById(idConstants.createListButton)
        if (btn && document.activeElement !== btn) btn.focus()
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const initialSelectedLists =
    lists
      ?.filter((l: any) =>
        l.records?.some((record: any) => record.uri === recordId)
      )
      .map((l: any) => l.id) || []

  const hasChanges =
    selectedLists.length !== initialSelectedLists.length ||
    selectedLists.some((id) => !initialSelectedLists.includes(id))

  const handleCreateSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!listName || listName.length > 100) return
    if (!patron?.id) return
    try {
      const url = `${BASE_URL}/api/account/lists/list`

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patronId: patron.id.toString(),
          listName,
          description: "",
          records: [],
        }),
      })
      if (response.ok) {
        const data = await response.json()
        if (data && data.list) {
          setUpdatedAccountData({
            ...updatedAccountData,
            lists: [data.list, ...(lists || [])],
          })
          setSelectedLists((prev) => [...prev, data.list.id])
        }
        setListCreationStatus(STATIC_STATUS_MESSAGES.createListSuccess)
      } else {
        const errorData = await response.json()
        // TO DO: Emma clean up
        setListCreationStatus(
          errorData.error === "List with that name already exists"
            ? STATIC_STATUS_MESSAGES.duplicateListNameFailure
            : STATIC_STATUS_MESSAGES.createListFailure
        )
      }
      setPersistentFocus(idConstants.listMenuStatusBanner)
    } catch (error) {
      console.error("Error creating list:", error)
    } finally {
      setShowCreateForm(false)
      setListName("")
      setIsSubmitting(false)
    }
  }

  const listCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const listId = event.target.id
    if (event.target.checked) {
      setSelectedLists((prev) => [...prev, listId])
    } else {
      setSelectedLists((prev) => prev.filter((id) => id !== listId))
    }
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!hasChanges || !patron?.id || !lists) {
      return
    }

    const listsToAdd = selectedLists.filter(
      (id) => !initialSelectedLists.includes(id)
    )
    const listsToRemove = initialSelectedLists.filter(
      (id) => !selectedLists.includes(id)
    )

    setIsSubmitting(true)
    try {
      const promises: Promise<any>[] = []

      for (const listId of listsToAdd) {
        promises.push(
          fetch(`${BASE_URL}/api/account/lists/records?uris=${recordId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patronId: patron.id.toString(),
              listId,
            }),
          }).then((res) => {
            if (!res.ok) throw new Error("Failed to add to list")
            return res.json()
          })
        )
      }

      for (const listId of listsToRemove) {
        promises.push(
          fetch(`${BASE_URL}/api/account/lists/records?uris=${recordId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patronId: patron.id.toString(),
              listId,
            }),
          }).then((res) => {
            if (!res.ok) throw new Error("Failed to remove from list")
            return res.json()
          })
        )
      }

      const results = await Promise.all(promises)

      if (results.length > 0 && setUpdatedAccountData) {
        setUpdatedAccountData((prevData: any) => {
          const data = prevData || updatedAccountData
          if (!data || !data.lists) return data

          let updatedLists = [...data.lists]
          results.forEach((resData: any) => {
            const updatedList = resData.list || resData
            updatedLists = updatedLists.map((l: any) =>
              l.id === updatedList.id
                ? { ...l, ...updatedList, isDefaultList: l.isDefaultList }
                : l
            )
          })

          return { ...data, lists: updatedLists }
        })
        setStatus(
          inAccount
            ? STATIC_STATUS_MESSAGES.accountSuccess
            : STATIC_STATUS_MESSAGES.listChangesSuccess
        )
      } else {
        setStatus(
          inAccount
            ? STATIC_STATUS_MESSAGES.accountFailure
            : STATIC_STATUS_MESSAGES.listChangesFailure
        )
      }
      setTimeout(() => {
        setPersistentFocus(
          inAccount
            ? `${idConstants.listStatusBanner}`
            : `${idConstants.listStatusBanner}-${recordId}`
        )
      }, 150)
    } catch (error) {
      console.error("Error updating bib in lists:", error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  const ContentWrapper: any = isMobile ? DrawerContent : PopoverContent
  const HeaderWrapper: any = isMobile ? DrawerHeader : PopoverHeader
  const FooterWrapper: any = isMobile ? DrawerFooter : PopoverFooter

  return (
    <ContentWrapper
      aria-modal={true}
      _focus={{ outline: "none" }}
      textAlign="left"
      {...(isMobile
        ? { borderTopRadius: "16px" }
        : {
            boxShadow: "lg",
            width: "320px",
          })}
    >
      <FocusLock
        returnFocus={false}
        persistentFocus={false}
        disabled={isMobile || !isOpen}
        autoFocus={false}
      >
        <HeaderWrapper
          sx={{
            color: "ui.typography.heading",
            fontWeight: "medium",
            _dark: {
              color: "dark.ui.typography.heading",
            },
            padding: "s",
            borderBottom: "1px solid var(--ui-border-default, #BDBDBD)",
          }}
        >
          <Heading size="heading6" fontWeight="bold">
            Select lists
          </Heading>
        </HeaderWrapper>
        <Box
          sx={{
            fontWeight: "normal",
            maxHeight: "360px",
            overflowY: "auto",
            paddingBottom: "s",
            paddingRight: "s",
            paddingLeft: "s",
            paddingTop: "xs",
            flex: "1",
            ...(isMobile
              ? {
                  borderTopRadius: "4px !important",
                }
              : {}),
          }}
        >
          {showCreateForm ? (
            <Form
              id="create-list-form"
              sx={{
                padding: "s",
                borderRadius: "2px",
                background: "var(--ui-bg-default, #F5F5F5)",
                marginBottom: "xs",
                marginTop: "xs",
                div: { gap: "s" },
              }}
            >
              <FormField>
                <TextInput
                  id={idConstants.createListNameInput}
                  value={listName}
                  labelText="List name (required)"
                  showLabel={true}
                  placeholder="Enter list name"
                  helperText={
                    <>
                      <Box as="span" aria-hidden="true">
                        {100 - listName.length} characters remaining
                      </Box>
                      <Box
                        as="span"
                        sx={{
                          border: "0",
                          clip: "rect(0, 0, 0, 0)",
                          height: "1px",
                          margin: "-1px",
                          overflow: "hidden",
                          padding: "0",
                          position: "absolute",
                          whiteSpace: "nowrap",
                          width: "1px",
                        }}
                      >
                        {100 - debouncedListName.length} characters remaining
                      </Box>
                    </>
                  }
                  isInvalid={!listName.trim() || listName.length > 100}
                  invalidText="List name must be 100 characters or less"
                  onChange={(e: any) => setListName(e.target.value)}
                  isClearable
                  isClearableCallback={() => setListName("")}
                  sx={{ fontWeight: "normal" }}
                />
              </FormField>

              <FormField>
                <Flex width="100%" justifyContent="flex-start" gap="xs">
                  <Button
                    id="submit"
                    isDisabled={
                      !listName.trim() || listName.length > 100 || isSubmitting
                    }
                    onClick={handleCreateSubmit}
                  >
                    Create list
                  </Button>
                  <Button
                    id="cancel"
                    variant="secondary"
                    onClick={() => {
                      setShowCreateForm(false)
                      setPersistentFocus(idConstants.createListButton)
                    }}
                    sx={{ background: "white" }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </FormField>
            </Form>
          ) : (
            <Button
              ref={initialFocusRef}
              id={idConstants.createListButton}
              variant="text"
              paddingLeft="xs"
              marginBottom="xs"
              onClick={() => {
                setShowCreateForm(true)
                setListCreationStatus(null)
                setPersistentFocus(idConstants.createListNameInput)
              }}
            >
              <Icon name="plus" size="medium" align="left" />
              Create new list
            </Button>
          )}

          <Box
            tabIndex={-1}
            id={idConstants.listMenuStatusBanner}
            sx={{ "&:not(:empty)": { marginTop: "xs", marginBottom: "xs" } }}
          >
            {listCreationStatus && (
              <StatusBanner
                type={listCreationStatus.type}
                message={listCreationStatus.message}
                isMiniBanner={true}
              />
            )}
          </Box>
          <SearchableCheckboxGroup
            id="search-lists"
            searchPlaceholder="Search for a list"
            label="Recent lists"
            isSearchable={lists.length > 5}
            items={
              lists?.map((list: any) => ({
                id: list.id,
                label: list.listName,
                ...list,
              })) || []
            }
            selectedItems={selectedLists}
            onChange={listCheckBoxChange}
            renderRightLabel={(item) =>
              item.records?.some((record: any) => record.uri === recordId) && (
                <Icon
                  size="medium"
                  name="contentBookmark"
                  color="ui.gray.dark"
                />
              )
            }
          />
        </Box>
        <FooterWrapper
          sx={{ borderTop: "1px solid var(--ui-gray-light-cool, #E9E9E9)" }}
        >
          <Form id="save-list-management">
            <FormField>
              <Flex width="100%" justifyContent="flex-end" gap="xs">
                <Button
                  id="cancel"
                  variant="secondary"
                  onClick={() => {
                    setShowCreateForm(false)
                    onClose()
                    setTimeout(() => {
                      setPersistentFocus(
                        `popover-trigger-manage-bib-${recordId}`
                      )
                    }, 150)
                  }}
                  isDisabled={isSubmitting}
                  sx={{ background: "white" }}
                >
                  Cancel
                </Button>
                <Button
                  id="submit"
                  isDisabled={isSubmitting || !hasChanges}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </Flex>
            </FormField>
          </Form>
        </FooterWrapper>
      </FocusLock>
    </ContentWrapper>
  )
}

export default ManageBibInListMenu
