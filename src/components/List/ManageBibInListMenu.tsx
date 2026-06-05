import {
  Button,
  Icon,
  Flex,
  Form,
  FormField,
  TextInput,
  Heading,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import {
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react"
import { useContext, useState, useEffect, useRef } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"
import type { StatusType } from "../MyAccount/Settings/StatusBanner"
import { StatusBanner } from "../MyAccount/Settings/StatusBanner"
import { SearchableCheckboxGroup } from "./SearchableCheckboxGroup"

export const ManageBibInListMenu = ({
  isOpen,
  onClose,
  list,
  setStatus,
  setStatusMessage,
  recordId,
}: {
  isOpen: boolean
  onClose: () => void
  list?: any
  setStatus: any
  setStatusMessage: any
  recordId: string
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const patron = updatedAccountData?.patron
  const lists = updatedAccountData?.lists || []

  // Create list form banner and button focus management
  const createListButtonRef = useRef<HTMLButtonElement>(null)
  const internalBannerRef = useRef<HTMLDivElement>(null)
  const [listCreationStatus, setListCreationStatus] = useState<StatusType>("")
  const [listCreationStatusMessage, setListCreationStatusMessage] =
    useState<string>("")
  useEffect(() => {
    if (listCreationStatus !== "" && internalBannerRef.current) {
      setTimeout(() => {
        internalBannerRef.current?.focus()
      }, 100)
    }
  }, [listCreationStatus])

  const [listName, setListName] = useState(list?.listName || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedLists, setSelectedLists] = useState<string[]>(
    lists
      ?.filter((l: any) =>
        l.records?.some((record: any) => record.uri === recordId)
      )
      .map((l: any) => l.id) || []
  )

  useEffect(() => {
    if (isOpen) {
      setListName(list?.listName || "")
      setIsSubmitted(false)
      setShowCreateForm(false)
      setStatus("")
      setListCreationStatus("")
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

    setIsSubmitted(true)
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
        setListCreationStatus("success")
        setListCreationStatusMessage("List created.")
      } else {
        setListCreationStatus("failure")
        setListCreationStatusMessage("List creation failed.")
      }
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
      }

      setStatus("success")
      setStatusMessage(
        "Your list changes have been saved. Lists can be managed from your patron account."
      )
    } catch (error) {
      console.error("Error updating bib in lists:", error)
      setStatus("failure")
      setStatusMessage(
        "Your list changes could not be saved. Try again or contact us for assistance. Lists can be managed from your patron account."
      )
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

  return (
    <PopoverContent
      _focus={{ outline: "none" }}
      width={{ base: "320px", md: "320px" }}
      textAlign="left"
    >
      <PopoverHeader
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
      </PopoverHeader>
      <PopoverBody
        sx={{
          margin: "xs",
          maxHeight: "360px",
          overflowY: "auto",
          fontWeight: "normal",
        }}
      >
        {showCreateForm ? (
          <Form
            id="create-list-form"
            sx={{
              padding: "s",
              borderRadius: "2px",
              background: "var(--ui-bg-default, #F5F5F5)",
              marginBottom: "s",
            }}
          >
            <FormField>
              <TextInput
                id="list-name"
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
                    setTimeout(() => createListButtonRef.current?.focus(), 100)
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
            ref={createListButtonRef}
            variant="text"
            paddingLeft="xs"
            onClick={() => setShowCreateForm(true)}
          >
            <Icon name="plus" size="medium" align="left" />
            Create new list
          </Button>
        )}

        <div
          tabIndex={-1}
          ref={internalBannerRef}
          style={{ marginTop: "8px", marginBottom: "8px" }}
        >
          {listCreationStatus !== "" && (
            <StatusBanner
              status={listCreationStatus}
              statusMessage={listCreationStatusMessage}
            />
          )}
        </div>

        <Heading pt="xs" pb="xs" size="heading8" fontWeight="500">
          Recent lists
        </Heading>
        <SearchableCheckboxGroup
          id="lists"
          searchPlaceholder="Search for a list"
          items={
            lists?.map((list) => ({
              id: list.id,
              label: list.listName,
              list,
            })) || []
          }
          isSearchable={lists.length > 5}
          selectedItems={selectedLists}
          onChange={listCheckBoxChange}
          renderRightLabel={(item) =>
            item.list.records?.some(
              (record: any) => record.uri === recordId
            ) ? (
              <Icon size="medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="#616161"
                    d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
                  />
                </svg>
              </Icon>
            ) : null
          }
        />
      </PopoverBody>
      <PopoverFooter>
        {isSubmitting ? (
          loader
        ) : (
          <Form
            id="save-list-management"
            sx={{
              padding: "xs",
            }}
          >
            <FormField>
              <Flex width="100%" justifyContent="flex-end" gap="xs">
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
                  isDisabled={isSubmitting || showCreateForm}
                  onClick={handleSubmit}
                >
                  Save changes
                </Button>
              </Flex>
            </FormField>
          </Form>
        )}
      </PopoverFooter>
    </PopoverContent>
  )
}
