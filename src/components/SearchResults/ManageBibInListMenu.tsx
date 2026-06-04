import {
  Button,
  Icon,
  Box,
  Flex,
  Form,
  FormField,
  TextInput,
  Heading,
} from "@nypl/design-system-react-components"
import {
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import styles from "../../../../../styles/components/MyAccount.module.scss"
import { useContext, useState, useEffect, useRef } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"

export const ManageBibInListMenu = ({
  isOpen,
  onClose,
  list,
  setStatus,
  setStatusMessage,
  bannerRef,
}: {
  isOpen: boolean
  onClose: () => void
  list?: any
  setStatus: any
  setStatusMessage: any
  bannerRef?: any
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData

  const internalBannerRef = useRef<HTMLDivElement>(null)
  const [listName, setListName] = useState(list?.listName || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setListName(list?.listName || "")
      setIsSubmitted(false)
    }
  }, [isOpen, list])

  const handleSubmit = async (e: React.MouseEvent) => {
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
      console.error(`Error creating list:`, error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  return (
    <PopoverContent
      boxShadow="lg"
      _focus={{ outline: "none" }}
      width={{ base: "320px", md: "400px" }}
    >
      <PopoverArrow />
      <PopoverHeader
        sx={{
          color: "ui.typography.heading",
          fontWeight: "medium",
          _dark: {
            color: "dark.ui.typography.heading",
          },
          paddingTop: "l",
          paddingLeft: "l",
          paddingRight: "l",
          paddingBottom: "s",
          borderBottom: "none",
        }}
      >
        <Heading size="heading6">Select lists</Heading>
      </PopoverHeader>
      <PopoverCloseButton mt="s" />
      <PopoverBody paddingLeft="l" paddingRight="l" paddingBottom="l">
        <Form id="create-list-form" className={styles.modalBody}>
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
            <Flex
              width="100%"
              justifyContent="flex-end"
              gap="xs"
              paddingTop="s"
            >
              <Button
                id="submit"
                isDisabled={!listName || listName.length > 100 || isSubmitting}
                onClick={handleSubmit}
              >
                Create list
              </Button>
              <Button id="cancel" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </FormField>
        </Form>
      </PopoverBody>
    </PopoverContent>
  )
}
