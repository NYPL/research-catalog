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
import { downloadList, duplicateList } from "../../../../utils/listUtils"
import { useDisclosure } from "@chakra-ui/react"
import { CreateEditListModal } from "./CreateEditList"
import { STATIC_STATUS_MESSAGES } from "../../../../utils/statusUtils"
import { idConstants, useFocusContext } from "../../../../context/FocusContext"

/**
 * The ListActionsMenu component renders the actions button and menu (with list operations)
 *  displayed for each list in the user's lists table.
 */
const ListActionsMenu = ({
  list,
  setStatus,
  bannerRef,
}: {
  list: List
  setStatus
  bannerRef?: any
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData
  const { setPersistentFocus } = useFocusContext()

  // DS Modal controls used for Delete list modal
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const [modalProps, setModalProps] = useState<BaseModalProps>()
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
      try {
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
          setStatus(STATIC_STATUS_MESSAGES.deleteListSuccess)
        } else {
          setStatus(STATIC_STATUS_MESSAGES.deleteListFailure)
        }
        setPersistentFocus(idConstants.listStatusBanner)
      } catch (error) {
        console.error("Error deleting list:", error)
      } finally {
        closeModal()
      }
    },
    onCancel: () => {
      setStatus(null)
      closeModal()
    },
  }

  // Chakra modal controls used for Create/edit list modal
  const {
    isOpen: isEditOpen,
    onOpen: openEdit,
    onClose: closeEdit,
  } = useDisclosure()

  const listOptions: ListItemsData[] = [
    {
      type: "action",
      id: "duplicate",
      label: "Duplicate",
      media: { type: "icon", name: "contentCopy" },
      onClick: async () => {
        setStatus(null)
        await duplicateList({
          list,
          patron,
          lists,
          updatedAccountData,
          setUpdatedAccountData,
          setStatus,
          inList: false,
        })
        setPersistentFocus(idConstants.listStatusBanner)
      },
    },
  ]

  if (list.recordCount > 0) {
    listOptions.push({
      type: "action",
      id: "download",
      label: "Download",
      media: { type: "icon", name: "navigationArrowDown" },
      onClick: async () => {
        setStatus(null)
        downloadList(list, "modified_date_asc")
      },
    })
  }

  if (!list.isDefaultList) {
    listOptions.push({
      type: "action",
      id: "delete",
      label: "Delete",
      media: { type: "icon", name: "actionDelete" },
      onClick: () => {
        setStatus(null)
        setModalProps(deleteListModalProps as ConfirmationModalProps)
        openModal()
      },
    })
    listOptions.unshift({
      type: "action",
      id: "edit",
      label: "Edit",
      media: { type: "icon", name: "editorMode" },
      onClick: () => {
        setStatus(null)
        openEdit()
      },
    })
  }

  return (
    <>
      <Flex justifyContent="flex-end" width="100%">
        <Menu
          id="list-options-menu"
          className={`${
            list.isDefaultList
              ? styles.defaultListOptionsMenu
              : styles.listOptionsMenu
          } no-print`}
          showLabel={false}
          showBorder={true}
          labelText="Options"
          listItemsData={listOptions}
        />
      </Flex>
      <Modal {...modalProps} />
      <CreateEditListModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        mode="edit"
        list={list}
        setStatus={setStatus}
        bannerRef={bannerRef}
      />
    </>
  )
}

export default ListActionsMenu
