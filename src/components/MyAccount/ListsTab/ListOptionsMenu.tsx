import {
  Button,
  Flex,
  Icon,
  Text,
  Box,
  useModal,
  Menu,
} from "@nypl/design-system-react-components"
import type List from "../../../models/List"
import type {
  BaseModalProps,
  ConfirmationModalProps,
  ListItemsData,
} from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { BASE_URL } from "../../../config/constants"
import { useState } from "react"

/**
 * The ListOptionsModal component renders the "Options" button and modal (with list operations)
 *  displayed for each list in the user's lists table.
 */
const ListOptionsMenu = ({ list }: { list: List }) => {
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
    headingText: <h5 className={styles["noIconHeading"]}>Cancel request?</h5>,
    onConfirm: async () => {
      const response = await fetch(`${BASE_URL}/api/account/lists/${list.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      closeModal
    },
    onCancel: closeModal,
  }
  const [modalProps, setModalProps] = useState<BaseModalProps>(
    deleteListModalProps as ConfirmationModalProps
  )

  // <Icon name="navigationMoreVert" align="left" size="large" />

  const listOptions: ListItemsData[] = [
    {
      type: "action",
      id: "edit",
      label: "Edit",
      media: { type: "icon", name: "editorMode" },
      onClick: () => {},
    },
    {
      type: "action",
      id: "duplicate",
      label: "Duplicate",
      media: { type: "icon", name: "contentCopy" },
      onClick: () => {},
    },
    {
      type: "action",
      id: "download",
      label: "Download",
      media: { type: "icon", name: "download" },
      onClick: () => {},
    },
    {
      type: "action",
      id: "delete",
      label: "Delete",
      media: { type: "icon", name: "actionDelete" },
      onClick: () => {},
    },
  ]

  return (
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
  )
}

export default ListOptionsMenu
