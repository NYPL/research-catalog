import {
  Flex,
  Text,
  Box,
  useModal,
  Menu,
} from "@nypl/design-system-react-components"
import type {
  BaseModalProps,
  ConfirmationModalProps,
  ListItemsData,
} from "@nypl/design-system-react-components"
import styles from "../../../../../styles/components/MyAccount.module.scss"
import { BASE_URL } from "../../../../config/constants"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../../context/PatronDataContext"
import type { List } from "../../../../types/listTypes"
import { idConstants, useFocusContext } from "../../../../context/FocusContext"

/**
 * The ListActionsMenu component renders the "Options" button and modal (with list operations)
 *  displayed for each list in the user's lists table.
 */
const ListActionsMenu = ({
  list,
  setStatus,
  setStatusMessage,
}: {
  list: List
  setStatus
  setStatusMessage
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { setPersistentFocus, activeElementId } = useFocusContext()
  const { patron, lists } = updatedAccountData

  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const deleteListModalProps = {
    variant: "confirmation",
    bodyContent: (
      <Box className={styles.noIconBody}>
        <Text>
          Are you sure you want to delete this list? Deleted lists cannot be
          restored.
        </Text>
      </Box>
    ),
    closeButtonLabel: "No, keep list",
    confirmButtonLabel: "Yes, delete list",
    headingText: <h5 className={styles["noIconHeading"]}>Delete list</h5>,
    onConfirm: async () => {
      const response = await fetch(
        `${BASE_URL}/api/account/lists/list?listId=${list.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patronId: patron.id.toString() }),
        }
      )
      if (response.status === 200) {
        const updatedLists = lists.filter((l: any) => l.id !== list.id)
        setUpdatedAccountData({
          ...updatedAccountData,
          lists: updatedLists,
        })
        setStatus("success")
        setStatusMessage("Your list has been deleted.")
      } else {
        setStatus("failure")
        setStatusMessage("Your list could not be deleted.")
      }
      setPersistentFocus(idConstants.accountStatusBanner)
      console.log(activeElementId)
      closeModal()
    },
    onCancel: closeModal,
  }

  const [modalProps, setModalProps] = useState<BaseModalProps>()

  const listOptions: ListItemsData[] = [
    {
      type: "action",
      id: "edit",
      label: "Edit",
      media: { type: "icon", name: "editorMode" },
      onClick: () => {
        console.log("hello")
      },
    },
    {
      type: "action",
      id: "duplicate",
      label: "Duplicate",
      media: { type: "icon", name: "contentCopy" },
      onClick: () => {
        console.log("hello")
      },
    },
    {
      type: "action",
      id: "download",
      label: "Download",
      media: { type: "icon", name: "download" },
      onClick: () => {
        console.log("hello")
      },
    },
    {
      type: "action",
      id: "delete",
      label: "Delete",
      media: { type: "icon", name: "actionDelete" },
      onClick: () => {
        setModalProps(deleteListModalProps as ConfirmationModalProps)
        openModal()
      },
    },
  ]

  return (
    <>
      <Flex justifyContent="flex-end" width="100%">
        <Menu
          id="list-options-menu"
          className={`${styles.listOptionsMenu} no-print`}
          showLabel={false}
          showBorder={true}
          labelText="Options"
          listItemsData={listOptions}
        />
      </Flex>
      <Modal {...modalProps} />
    </>
  )
}

export default ListActionsMenu
