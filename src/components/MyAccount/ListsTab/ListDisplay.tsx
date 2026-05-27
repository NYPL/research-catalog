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
import { useFocusContext } from "../../../context/FocusContext"
import EmptyList from "./EmptyList"
import ListRecordsTable from "./ListRecordsTable"
import { useRouter } from "next/router"
import type { List, ListRecordsSort } from "../../../types/listTypes"
import { useContext, useEffect, useRef, useState } from "react"
import { StatusBanner, type StatusType } from "../Settings/StatusBanner"
import { PatronDataContext } from "../../../context/PatronDataContext"
import { BASE_URL } from "../../../config/constants"
import { EditListButton } from "./ListActions/CreateEditList"
import { downloadList } from "../../../utils/listUtils"

/* ListDisplay renders the list metadata, list operations, and the ListRecordTable. */

const ListDisplay = ({ list }: { list?: List }) => {
  const { updatedAccountData, setUpdatedAccountData } =
    useContext(PatronDataContext)
  const { patron, lists } = updatedAccountData

  const router = useRouter()
  const { setPersistentFocus } = useFocusContext()

  // Sort state for list records.
  const [activeSort, setActiveSort] = useState("added_date_asc")

  const bannerRef = useRef<HTMLDivElement>(null)

  // Manage status banner display for list actions
  const [status, setStatus] = useState<StatusType>("")
  const [statusMessage, setStatusMessage] = useState<string>("")
  useEffect(() => {
    if (status !== "" && bannerRef.current) {
      bannerRef.current.focus()
    }
  }, [status])

  // DS Modal controls used for Delete list modal
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const [modalProps, setModalProps] = useState<BaseModalProps>()

  if (!list) return null

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
  ].filter(Boolean)

  const joinedMetadata = metadata.reduce((acc, piece, i) => {
    if (i > 0) acc.push(separatingDot(i))
    acc.push(<Text key={i}>{piece}</Text>)
    return acc
  }, [])

  const deleteListModalProps = {
    variant: "confirmation",
    finalFocusRef: status !== "" ? bannerRef : undefined,
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
        } else {
          setStatus("failure")
          setStatusMessage("Your list could not be deleted.")
          closeModal()
        }
      } catch (error) {
        console.error("Error deleting list:", error)
      }
    },
    onCancel: closeModal,
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
          mt="xs"
          sx={{
            p: {
              display: "inline-block",
            },
          }}
        >
          {joinedMetadata}
        </Box>
        {list.description ? (
          <Box as="span" mt="m">
            {list.description}
          </Box>
        ) : (
          <Box as="span" mt="m" color="ui.gray.dark" fontStyle="italic">
            No description
          </Box>
        )}
        <ButtonGroup mt="m">
          <EditListButton
            list={list}
            bannerRef={bannerRef}
            setStatus={setStatus}
            setStatusMessage={setStatusMessage}
          />
          <Button
            variant="secondary"
            onClick={async () => {
              setStatus("")
              setStatusMessage("")
              try {
                const response = await fetch(
                  `${BASE_URL}/api/account/lists/list`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      patronId: patron.id.toString(),
                      listName: `${list.listName.substring(0, 90)} (copy)`,
                      description: list.description,
                      records: list.records
                        ? list.records.map((r) => r.uri)
                        : [],
                    }),
                  }
                )
                if (response.ok) {
                  const data = await response.json()
                  if (data && data.list) {
                    setUpdatedAccountData({
                      ...updatedAccountData,
                      lists: [data.list, ...lists],
                    })
                    window.open(
                      `${BASE_URL}/account/lists/${data.list.id}`,
                      "_blank"
                    )
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
            }}
          >
            <Icon name="contentCopy" align="left" size="medium" />
            Duplicate
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              downloadList(
                list,
                activeSort as ListRecordsSort,
                setStatus,
                setStatusMessage
              )
            }}
          >
            <Icon align="left" size="medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M15 9L13.9425 7.9425L9.75 12.1275V3H8.25V12.1275L4.065 7.935L3 9L9 15L15 9Z"
                  fill="#0069BF"
                />
              </svg>
            </Icon>
            Download
          </Button>
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
              setStatus("")
              setStatusMessage("")
              setModalProps(deleteListModalProps as ConfirmationModalProps)
              openModal()
            }}
          >
            <Icon name="actionDelete" align="left" size="medium" />
            Delete
          </Button>
        </ButtonGroup>
        <Modal {...modalProps} />
        <div tabIndex={-1} ref={bannerRef} style={{ marginTop: "24px" }}>
          {status !== "" && (
            <StatusBanner status={status} statusMessage={statusMessage} />
          )}
        </div>
      </Flex>
      {list.recordCount > 0 ? (
        <ListRecordsTable
          list={list}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />
      ) : (
        <EmptyList />
      )}
    </Flex>
  )
}

export default ListDisplay
