import {
  Flex,
  Text,
  Box,
  Icon,
  useModal,
  Heading,
  ButtonGroup,
  Button,
} from "@nypl/design-system-react-components"
import type {
  BaseModalProps,
  ConfirmationModalProps,
} from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"
import Link from "../../Link/Link"
import { useFocusContext, idConstants } from "../../../context/FocusContext"
import ListRecordsTable from "./ListRecordsTable"
import { useRouter } from "next/router"
import type { List, ListRecordsSort } from "../../../types/listTypes"
import { useContext, useRef, useState } from "react"
import { StatusBanner } from "../Settings/StatusBanner"
import type { StatusBannerState } from "../Settings/StatusBanner"
import { PatronDataContext } from "../../../context/PatronDataContext"
import { BASE_URL } from "../../../config/constants"
import { EditListButton } from "./ListActions/CreateEditList"
import { STATIC_STATUS_MESSAGES } from "../../../utils/statusUtils"
import { downloadList, duplicateList } from "../../../utils/listUtils"

/* ListDisplay renders the list metadata, list operations, and the ListRecordTable. */

const ListDisplay = ({ list }: { list: List }) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData

  const router = useRouter()
  const { setPersistentFocus } = useFocusContext()

  // Sort state for list records.
  const [activeSort, setActiveSort] = useState("added_date_asc")

  // Manage status banner display for list actions (CreateEditList modal needs explicit ref)
  const bannerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<StatusBannerState | null>(null)

  // DS Modal controls used for Delete list modal
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const [modalProps, setModalProps] = useState<BaseModalProps>()

  const separatingDot = (i) => (
    // @ts-ignore
    <Icon key={`dot-${i}`} size="xxsmall" ml="xs" mr="xs" pb="xxs" L>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="4"
        viewBox="0 0 4 4"
        fill="#000"
      >
        <circle cx="2" cy="2" r="2" fill="#000" />
      </svg>
    </Icon>
  )
  const metadata = [
    `${list.recordCount} record${list.recordCount === 1 ? "" : "s"}`,
    `Last modified on ${list.modifiedDate}`,
    `Created on ${list.createdDate}`,
  ]

  const joinedMetadata = metadata.reduce((acc, piece, i) => {
    if (i > 0) acc.push(separatingDot(i))
    acc.push(<Text key={i}>{piece}</Text>)
    return acc
  }, [])

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
          closeModal()
          await router.push(
            {
              pathname: "/account/[[...index]]",
              query: { index: ["lists"] },
            },
            "/account/lists",
            { shallow: true }
          )
          const updatedLists = lists.filter((l: any) => l.id !== list.id)
          setUpdatedAccountData({
            ...updatedAccountData,
            lists: updatedLists,
          })
          setStatus(STATIC_STATUS_MESSAGES.deleteListSuccess)
        } else {
          setStatus(STATIC_STATUS_MESSAGES.deleteListFailure)
          closeModal()
        }
      } catch (error) {
        console.error("Error deleting list:", error)
      }
    },
    onCancel: () => {
      setStatus(null)
      closeModal()
    },
  }

  return (
    <Flex flexDir="column">
      <Box mt="l" mb="l">
        <Link
          isUnderlined={false}
          href="/account/lists"
          onClick={(e: any) => {
            e.preventDefault()
            setPersistentFocus(null)
            router.push(
              {
                pathname: "/account/[[...index]]",
                query: { index: ["lists"] },
              },
              "/account/lists",
              { shallow: true }
            )
          }}
        >
          <Icon
            iconRotation="rotate90"
            name="arrow"
            size="xsmall"
            align="right"
            color="ui.link.primary"
          />
          <Box as="span" ml="xs" fontSize="14px">
            Back to all lists
          </Box>
        </Link>
      </Box>
      <Flex flexDir="column">
        <Heading level="h2" size="heading3">
          {list.listName}
        </Heading>
        <Box
          sx={{
            mt: "xs",
            div: { display: "inline-block" },
            p: { display: "inline-block" },
          }}
        >
          {joinedMetadata}
        </Box>
        {list.description ? (
          <Box as="span" mt="m">
            <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
            {list.description}
          </Box>
        ) : (
          <Box as="span" mt="m" color="ui.gray.dark" fontStyle="italic">
            No description
          </Box>
        )}
        <ButtonGroup mt="m">
          {!list.isDefaultList && (
            <EditListButton
              list={list}
              setStatus={setStatus}
              bannerRef={bannerRef}
            />
          )}
          <Button
            variant="secondary"
            onClick={async () => {
              setStatus(null)
              await duplicateList({
                list,
                patron,
                lists,
                updatedAccountData,
                setUpdatedAccountData,
                setStatus,
                openListInNewTab: true,
              })
              setPersistentFocus(idConstants.listStatusBanner)
            }}
          >
            <Icon name="contentCopy" align="left" size="medium" />
            Duplicate
          </Button>
          {list.recordCount > 0 && (
            <Button
              variant="secondary"
              onClick={async () => {
                setStatus(null)
                await downloadList(list, activeSort as ListRecordsSort)
              }}
            >
              <Icon align="left" size="medium" name="navigationArrowDown" />
              Download
            </Button>
          )}
          {!list.isDefaultList && (
            <Button
              variant="secondary"
              sx={{
                color: "ui.error.primary",
                borderColor: "ui.error.primary",
                _hover: {
                  color: "ui.error.primary",
                  borderColor: "ui.error.primary",
                  background: "ui.error.primary-05",
                },
              }}
              onClick={() => {
                setStatus(null)
                setModalProps(deleteListModalProps as ConfirmationModalProps)
                openModal()
              }}
            >
              <Icon name="actionDelete" align="left" size="medium" />
              Delete
            </Button>
          )}
        </ButtonGroup>
        <Modal {...modalProps} />
        <div
          tabIndex={-1}
          id={idConstants.listStatusBanner}
          ref={bannerRef}
          style={{ marginTop: "24px" }}
        >
          {status && (
            <StatusBanner type={status.type} message={status.message} />
          )}
        </div>
      </Flex>
      <ListRecordsTable
        list={list}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        setStatus={setStatus}
      />
    </Flex>
  )
}

export default ListDisplay
