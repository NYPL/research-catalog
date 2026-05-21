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
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react"
import styles from "../../../../../styles/components/MyAccount.module.scss"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../../context/PatronDataContext"
import { BASE_URL } from "../../../../config/constants"
import type { BaseModalProps } from "@nypl/design-system-react-components"

const CreateListForm = ({ closeModal }: { closeModal: () => void }) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData

  const [listName, setListName] = useState("")
  const [listDescription, setListDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!listName || listName.length > 100 || listDescription.length > 500)
      return

    setIsSubmitting(true)
    try {
      const response = await fetch(`${BASE_URL}/api/account/lists/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patronId: patron.id.toString(),
          listName,
          description: listDescription,
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
        closeModal()
      }
    } catch (error) {
      console.error("Error creating list:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form id="create-list" className={styles.modalBody}>
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
        <TextInput
          type="textarea"
          id="list-description"
          value={listDescription}
          labelText="List description"
          placeholder="Enter list description"
          helperText={`${500 - listDescription.length} characters remaining`}
          showLabel={true}
          isInvalid={listDescription.length > 500}
          invalidText="List description must be 500 characters or less"
          onChange={(e: any) => setListDescription(e.target.value)}
          isClearable
          isClearableCallback={() => setListDescription("")}
        />
      </FormField>

      <FormField>
        <Flex width="100%" justifyContent="flex-end" gap="xs" paddingTop="s">
          <Button id="cancel" variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            id="submit"
            isDisabled={
              !listName ||
              listName.length > 100 ||
              listDescription.length > 500 ||
              isSubmitting
            }
            onClick={handleCreateSubmit}
          >
            Create list
          </Button>
        </Flex>
      </FormField>
    </Form>
  )
}

const CreateListButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button width={{ base: "100%", sm: "auto" }} onClick={onOpen}>
        <Icon name="plus" align="left" size="small" />
        Create new list
      </Button>
      <ChakraModal
        id="modal"
        scrollBehavior="inside"
        size={{ base: "full", md: "xl" }}
        isOpen={isOpen}
        onClose={onClose}
        aria-labelledby="Create list"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
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
              mb: "s",
            }}
          >
            <Heading size="heading5">Create new list</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Box paddingLeft="l" paddingRight="l" paddingBottom="l">
            <CreateListForm closeModal={onClose} />
          </Box>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default CreateListButton
