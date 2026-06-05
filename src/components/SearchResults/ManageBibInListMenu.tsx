import {
  Button,
  Icon,
  Box,
  Flex,
  Form,
  FormField,
  TextInput,
  Heading,
  Text,
  CheckboxGroup,
  Checkbox,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import {
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
} from "@chakra-ui/react"
import { useContext, useState, useEffect, useRef } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"
import type SearchResultsBib from "../../models/SearchResultsBib"
import type Bib from "../../models/Bib"

export const ManageBibInListMenu = ({
  isOpen,
  onClose,
  list,
  setStatus,
  setStatusMessage,
  bannerRef,
  bib,
}: {
  isOpen: boolean
  onClose: () => void
  list?: any
  setStatus: any
  setStatusMessage: any
  bannerRef?: any
  bib: SearchResultsBib | Bib
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData

  const internalBannerRef = useRef<HTMLDivElement>(null)
  const createListButtonRef = useRef<HTMLButtonElement>(null)
  const [listName, setListName] = useState(list?.listName || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedLists, setSelectedLists] = useState<string[]>(
    lists
      ?.filter((l: any) =>
        l.records?.some((record: any) => record.uri === bib.id)
      )
      .map((l: any) => l.id) || []
  )

  useEffect(() => {
    if (isOpen) {
      setListName(list?.listName || "")
      setIsSubmitted(false)
      setShowCreateForm(false)
      setStatus("")
      setSelectedLists(
        lists
          ?.filter((l: any) =>
            l.records?.some((record: any) => record.uri === bib.id)
          )
          .map((l: any) => l.id) || []
      )
    }
  }, [isOpen, list, bib.id])

  const handleCreateSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!listName || listName.length > 100) return

    setIsSubmitting(true)
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
            lists: [data.list, ...lists],
          })
          setSelectedLists((prev) => [...prev, data.list.id])
        }
        setStatus("success")
        setStatusMessage("List created.")
        setShowCreateForm(false)
        setListName("")
      } else {
        setStatus("failure")
        setStatusMessage("List creation failed. Try again.")
      }
    } catch (error) {
      console.error("Error creating list:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isChecked = (listId: string): boolean => {
    return !!selectedLists?.includes(listId)
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

  const loader = (
    <SkeletonLoader
      showImage={false}
      mb="m"
      ml="0"
      maxWidth="300px"
      contentSize={1}
      showHeading={false}
    />
  )

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    const initialSelectedLists =
      lists
        ?.filter((l: any) =>
          l.records?.some((record: any) => record.uri === bib.id)
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

    setIsSubmitting(true)
    try {
      const promises: Promise<any>[] = []

      for (const listId of listsToAdd) {
        promises.push(
          fetch(`${BASE_URL}/api/account/lists/records?uris=${bib.id}`, {
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
          fetch(`${BASE_URL}/api/account/lists/records?uris=${bib.id}`, {
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

  return (
    <PopoverContent
      boxShadow="lg"
      _focus={{ outline: "none" }}
      width={{ base: "320px", md: "320px" }}
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
      <PopoverBody sx={{ margin: "xs" }}>
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
        <Heading pt="s" pb="s" size="heading8" fontWeight="500">
          Recent lists
        </Heading>
        <CheckboxGroup
          id="lists-checkboxGroup"
          layout="column"
          isFullWidth
          showLabel={false}
          mb="0"
          labelText={""}
          name={""}
        >
          {lists.map((list) => (
            <Flex key={list.id} justifyContent="space-between">
              <Checkbox
                id={list.id}
                labelText={list.listName}
                name={list.listName}
                isChecked={isChecked(list.id)}
                onChange={listCheckBoxChange}
              />
              {list.records?.some((record: any) => record.uri === bib.id) && (
                <Icon size="medium">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      fill="#616161"
                      d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
                    />
                  </svg>
                </Icon>
              )}
            </Flex>
          ))}
        </CheckboxGroup>
      </PopoverBody>
      <PopoverFooter>
        <Form
          id="save-list-management"
          sx={{
            padding: "xs",
          }}
        >
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
      </PopoverFooter>
    </PopoverContent>
  )
}
