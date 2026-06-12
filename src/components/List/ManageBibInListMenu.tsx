import {
  Button,
  Icon,
  Flex,
  Form,
  FormField,
  TextInput,
  Heading,
  SkeletonLoader,
  Box,
} from "@nypl/design-system-react-components"
import {
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@chakra-ui/react"
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
}: {
  isOpen: boolean
  onClose: () => void
  list?: any
  setStatus: any
  recordId: string
  isMobile?: boolean
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
      setListName(list?.listName || "")
      setShowCreateForm(false)
      setStatus(null)
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
        setListCreationStatus(STATIC_STATUS_MESSAGES.createListFailure)
      }
      setPersistentFocus(idConstants.listMenuStatusBanner)
    } catch (error) {
      console.error("Error creating list:", error)
    } finally {
      setShowCreateForm(false)
      setListName("")
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

    const initialSelectedLists =
      lists
        ?.filter((l: any) =>
          l.records?.some((record: any) => record.uri === recordId)
        )
        .map((l: any) => l.id) || []

    const listsToAdd = selectedLists.filter(
      (id) => !initialSelectedLists.includes(id)
    )
    const listsToRemove = initialSelectedLists.filter(
      (id) => !selectedLists.includes(id)
    )

    if (listsToAdd.length === 0 && listsToRemove.length === 0) {
      onClose()
      return
    }
    if (!patron?.id || !lists) {
      return
    }

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
              l.id === updatedList.id ? { ...l, ...updatedList } : l
            )
          })

          return { ...data, lists: updatedLists }
        })
        setStatus(STATIC_STATUS_MESSAGES.listChangesSuccess)
      } else {
        setStatus(STATIC_STATUS_MESSAGES.listChangesFailure)
      }
      setPersistentFocus(`${idConstants.listStatusBanner}-${recordId}`)
    } catch (error) {
      console.error("Error updating bib in lists:", error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  const loader = (
    <SkeletonLoader
      showImage={false}
      maxWidth="300px"
      contentSize={2}
      mt="0"
      mb="xs"
      showHeading={false}
    />
  )

  const ContentWrapper: any = isMobile ? DrawerContent : PopoverContent
  const HeaderWrapper: any = isMobile ? DrawerHeader : PopoverHeader
  const BodyWrapper: any = isMobile ? DrawerBody : PopoverBody
  const FooterWrapper: any = isMobile ? DrawerFooter : PopoverFooter

  return (
    <ContentWrapper
      _focus={{ outline: "none" }}
      textAlign="left"
      {...(isMobile
        ? { borderTopRadius: "16px" }
        : {
            boxShadow: "lg",
            width: "320px",
          })}
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
      <BodyWrapper
        sx={{
          fontWeight: "normal",
          maxHeight: "360px",
          overflowY: "auto",
          ...(isMobile
            ? {
                borderTopRadius: "4px !important",
                paddingLeft: "s",
                paddingRight: "s",
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
            }}
          >
            <FormField>
              <TextInput
                id={idConstants.createListNameInput}
                value={listName}
                labelText="List name (required)"
                showLabel={true}
                placeholder="Enter list name"
                helperText={`${100 - listName.length} characters remaining`}
                isInvalid={listName.length > 100}
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
                    !listName || listName.length > 100 || isSubmitting
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
            id={idConstants.createListButton}
            variant="text"
            paddingLeft="xs"
            marginBottom="xs"
            onClick={() => {
              setShowCreateForm(true)
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
            />
          )}
        </Box>
        <SearchableCheckboxGroup
          id="search-lists"
          searchPlaceholder="Search for a list"
          label="Recent lists"
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
              <Icon size="medium" name="contentBookmark" color="ui.gray.dark" />
            )
          }
        />
      </BodyWrapper>
      <FooterWrapper
        sx={{ borderTop: "1px solid var(--ui-gray-light-cool, #E9E9E9)" }}
      >
        <Form id="save-list-management">
          <FormField>
            <Flex width="100%" justifyContent="flex-end" gap="xs">
              {isSubmitting ? (
                loader
              ) : (
                <>
                  <Button
                    id="cancel"
                    variant="secondary"
                    onClick={onClose}
                    sx={{ background: "white" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    id="submit"
                    isDisabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Save changes
                  </Button>
                </>
              )}
            </Flex>
          </FormField>
        </Form>
      </FooterWrapper>
    </ContentWrapper>
  )
}

export default ManageBibInListMenu
