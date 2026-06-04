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
  const [listName, setListName] = useState(list?.listName || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
    }
  }, [isOpen, list])

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
        }
        setStatus("success")
        setStatusMessage("List created.")
      } else {
        setStatus("failure")
        setStatusMessage("List creation failed. Try again.")
      }
    } catch (error) {
      console.error("Error creating list:", error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  const isChecked = (listId: string): boolean => {
    return !!selectedLists?.includes(listId)
  }

  function listCheckBoxChange(event): void {
    //
  }

  function handleSubmit(event): void {
    //
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
        <Form
          id="create-list-form"
          sx={{
            padding: "s",
            borderRadius: "2px",
            background: "var(--ui-bg-default, #F5F5F5)",
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
            />
          </FormField>

          <FormField>
            <Flex width="100%" justifyContent="flex-start" gap="xs">
              <Button
                id="submit"
                isDisabled={!listName || listName.length > 100 || isSubmitting}
                onClick={handleCreateSubmit}
              >
                Create list
              </Button>
              <Button
                id="cancel"
                variant="secondary"
                onClick={onClose}
                sx={{ background: "white" }}
              >
                Cancel
              </Button>
            </Flex>
          </FormField>
        </Form>
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
              <Button
                id="cancel"
                variant="secondary"
                onClick={onClose}
                sx={{ background: "white" }}
              >
                Cancel
              </Button>
              <Button id="submit" isDisabled={false} onClick={handleSubmit}>
                Save changes
              </Button>
            </Flex>
          </FormField>
        </Form>
      </PopoverFooter>
    </PopoverContent>
  )
}
