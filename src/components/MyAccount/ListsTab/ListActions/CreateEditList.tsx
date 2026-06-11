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
import { useContext, useState, useEffect } from "react"
import { PatronDataContext } from "../../../../context/PatronDataContext"
import { BASE_URL } from "../../../../config/constants"
import { STATIC_STATUS_MESSAGES } from "../../../../utils/statusUtils"

/* Renders the Create or Edit list modal, and the triggering buttons (Create new list, Edit list). */
export const CreateEditListModal = ({
  isOpen,
  onClose,
  mode = "create",
  list,
  setStatus,
  bannerRef,
}: {
  isOpen: boolean
  onClose: () => void
  mode?: "create" | "edit"
  list?: any
  setStatus: any
  bannerRef?: any
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData

  const [listName, setListName] = useState(list?.listName || "")
  const [listDescription, setListDescription] = useState(
    list?.description || ""
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [canFocusBannerOnClose, setCanFocusBannerOnClose] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setListName(list?.listName || "")
      setListDescription(list?.description || "")
      setCanFocusBannerOnClose(false)
    }
  }, [isOpen, list])

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!listName || listName.length > 100 || listDescription.length > 500)
      return

    setIsSubmitting(true)
    setStatus(null)
    setCanFocusBannerOnClose(true)
    try {
      const isEdit = mode === "edit"
      const url = isEdit
        ? `${BASE_URL}/api/account/lists/list?listId=${list.id}`
        : `${BASE_URL}/api/account/lists/list`

      const response = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patronId: patron.id.toString(),
          listName,
          description: listDescription,
          records: isEdit ? undefined : [],
        }),
      })
      if (response.ok) {
        const data = await response.json()
        if (data && data.list) {
          if (isEdit) {
            const updatedLists = lists.map((l: any) =>
              l.id === list.id ? { ...l, ...data.list } : l
            )
            setUpdatedAccountData({
              ...updatedAccountData,
              lists: updatedLists,
            })
          } else {
            setUpdatedAccountData({
              ...updatedAccountData,
              lists: [data.list, ...lists],
            })
          }
        }
        setStatus(
          isEdit
            ? STATIC_STATUS_MESSAGES.accountSuccess
            : STATIC_STATUS_MESSAGES.createListSuccess
        )
      } else {
        if (isEdit) {
          setListName(list?.listName || "")
          setListDescription(list?.description || "")
        }
        setStatus(
          isEdit
            ? STATIC_STATUS_MESSAGES.accountFailure
            : STATIC_STATUS_MESSAGES.createListFailure
        )
      }
    } catch (error) {
      console.error(`Error ${mode}ing list:`, error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  return (
    <ChakraModal
      id={`${mode}-list`}
      scrollBehavior="inside"
      size={{ base: "full", md: "xl" }}
      isOpen={isOpen}
      onClose={onClose}
      aria-labelledby={`${mode} list`}
      finalFocusRef={canFocusBannerOnClose ? bannerRef : undefined}
      returnFocusOnClose={!canFocusBannerOnClose}
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
          <Heading size="heading5">
            {mode === "edit" ? "Edit list" : "Create new list"}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Box paddingLeft="l" paddingRight="l" paddingBottom="l">
          <Form id={`${mode}-list-form`} className={styles.modalBody}>
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
                helperText={`${
                  500 - listDescription.length
                } characters remaining`}
                showLabel={true}
                isInvalid={listDescription.length > 500}
                invalidText="List description must be 500 characters or less"
                onChange={(e: any) => setListDescription(e.target.value)}
              />
            </FormField>

            <FormField>
              <Flex
                width="100%"
                justifyContent="flex-end"
                gap="xs"
                paddingTop="s"
              >
                <Button id="cancel" variant="secondary" onClick={onClose}>
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
                  onClick={handleSubmit}
                >
                  {mode === "edit" ? "Save changes" : "Create list"}
                </Button>
              </Flex>
            </FormField>
          </Form>
        </Box>
      </ModalContent>
    </ChakraModal>
  )
}

export const CreateListButton = ({ setStatus, bannerRef }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button width={{ base: "100%", sm: "auto" }} onClick={onOpen}>
        <Icon name="plus" align="left" size="small" />
        Create new list
      </Button>
      <CreateEditListModal
        isOpen={isOpen}
        onClose={onClose}
        mode="create"
        setStatus={setStatus}
        bannerRef={bannerRef}
      />
    </>
  )
}

export const EditListButton = ({ list, setStatus, bannerRef }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="secondary" onClick={onOpen}>
        <Icon name="editorMode" align="left" size="medium" />
        Edit
      </Button>
      <CreateEditListModal
        isOpen={isOpen}
        onClose={onClose}
        mode="edit"
        list={list}
        setStatus={setStatus}
        bannerRef={bannerRef}
      />
    </>
  )
}
