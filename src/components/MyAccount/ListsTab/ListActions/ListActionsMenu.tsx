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
import { buildListRecords } from "../../../../utils/listUtils"
import { useDisclosure } from "@chakra-ui/react"
import { CreateEditListModal } from "./CreateEditList"

/**
 * The ListActionsMenu component renders the actions button and menu (with list operations)
 *  displayed for each list in the user's lists table.
 */
const ListActionsMenu = ({
  list,
  setStatus,
  setStatusMessage,
  bannerRef,
}: {
  list: List
  setStatus
  setStatusMessage
  bannerRef?: any
}) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData

  // DS Modal controls used for Delete list modal
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const [modalProps, setModalProps] = useState<BaseModalProps>()
  const deleteListModalProps = {
    variant: "confirmation",
    finalFocusRef: bannerRef,
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
          setStatus("success")
          setStatusMessage("Your list has been deleted.")
        } else {
          setStatus("failure")
          setStatusMessage("Your list could not be deleted.")
        }
      } catch (error) {
        console.error("Error deleting list:", error)
      } finally {
        closeModal()
      }
    },
    onCancel: closeModal,
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
      id: "edit",
      label: "Edit",
      media: { type: "icon", name: "editorMode" },
      onClick: () => {
        openEdit()
      },
    },
    {
      type: "action",
      id: "duplicate",
      label: "Duplicate",
      media: { type: "icon", name: "contentCopy" },
      onClick: async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/account/lists/list`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patronId: patron.id.toString(),
              listName: `${list.listName.substring(0, 90)} (copy)`,
              description: list.description,
              records: list.records ? list.records.map((r) => r.uri) : [],
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
            setStatusMessage("Your list has been duplicated.")
          } else {
            setStatus("failure")
            setStatusMessage("Your list could not be duplicated.")
          }
        } catch (error) {
          console.error("Error duplicating list:", error)
          setStatus("failure")
          setStatusMessage("Your list could not be duplicated.")
        }
      },
    },
    {
      type: "action",
      id: "download",
      label: "Download",
      media: { type: "icon", name: "download" },
      onClick: async () => {
        try {
          if (list.recordCount === 0) {
            setStatus("failure")
            setStatusMessage("Your list has no records to download.")
            return
          }

          const chunkSize = 50
          let allUpdatedRecords: any[] = []

          for (let i = 0; i < list.records.length; i += chunkSize) {
            const chunk = list.records.slice(i, i + chunkSize)
            const uris = chunk.map((r) => r.uri).join(",")
            const response = await fetch(
              `${BASE_URL}/api/account/lists/records?uris=${uris}`
            )
            if (response.ok) {
              const data = await response.json()
              if (data.bibData) {
                const updatedRecords = buildListRecords(
                  data.bibData,
                  chunk,
                  "added_date_asc"
                )
                allUpdatedRecords = [...allUpdatedRecords, ...updatedRecords]
              }
            }
          }

          const tsvRows = [
            ["Title", "Call number", "Location", "Date added to list"],
            ...allUpdatedRecords.map((r) => [
              `"${r.title ? r.title.replace(/"/g, '""') : ""}"`,
              `"${r.callNumber ? r.callNumber.replace(/"/g, '""') : ""}"`,
              `"${r.location ? r.location.replace(/"/g, '""') : ""}"`,
              `"${r.addedDate || ""}"`,
            ]),
          ]

          const tsvContent = tsvRows.map((e) => e.join("\t")).join("\n")
          const blob = new Blob([tsvContent], {
            type: "text/tab-separated-values;charset=utf-8;",
          })
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.setAttribute("href", url)
          link.setAttribute("download", `${list.listName || "list"}.tsv`)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          setStatus("success")
          setStatusMessage("Your list has been downloaded.")
        } catch (error) {
          console.error("Error downloading list:", error)
          setStatus("failure")
          setStatusMessage("Your list could not be downloaded.")
        }
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
      <CreateEditListModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        mode="edit"
        list={list}
        setStatus={setStatus}
        setStatusMessage={setStatusMessage}
        bannerRef={bannerRef}
      />
    </>
  )
}

export default ListActionsMenu
