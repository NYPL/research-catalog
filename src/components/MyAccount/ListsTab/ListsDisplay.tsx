import { useContext, useRef, useState, useEffect } from "react"
import {
  Box,
  Flex,
  SkeletonLoader,
  Table,
} from "@nypl/design-system-react-components"
import { PatronDataContext } from "../../../context/PatronDataContext"
import styles from "../../../../styles/components/MyAccount.module.scss"
import Link from "../../Link/Link"
import ListSort from "./ListSort"
import { idConstants, useFocusContext } from "../../../context/FocusContext"
import { generateListSlug, listsSortOptions } from "../../../utils/listUtils"
import { CreateListButton } from "./ListActions/CreateEditList"
import { BASE_URL } from "../../../config/constants"
import { useRouter } from "next/router"
import type { List } from "../../../types/listTypes"
import type { StatusBannerState } from "../Settings/StatusBanner"
import { StatusBanner } from "../Settings/StatusBanner"
import ListActionsMenu from "./ListActions/ListActionsMenu"

/* ListsDisplay renders a sort menu and all of a user's lists in a table. */
const ListsDisplay = () => {
  const { setUpdatedAccountData, updatedAccountData } =
    useContext(PatronDataContext)

  const { lists, patron } = updatedAccountData
  const router = useRouter()

  const { setPersistentFocus } = useFocusContext()

  const sortMenuRef = useRef<HTMLDivElement | null>(null)
  const [activeSort, setActiveSort] = useState("modified_date_desc")

  const [isLoading, setIsLoading] = useState(false)

  // Manage status banner display for list actions
  const bannerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<StatusBannerState | null>(null)
  useEffect(() => {
    if (status && bannerRef.current) {
      setTimeout(() => {
        bannerRef.current?.focus()
      }, 100)
    }
  }, [status])

  const loader = (
    <SkeletonLoader
      showImage={false}
      mb="m"
      ml="0"
      maxWidth="1200px"
      contentSize={5}
      showHeading={false}
    />
  )

  const handleSortChange = async (selectedSortOption: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}/api/account/lists?patronId=${patron.id}&sort=${selectedSortOption}`
      )
      if (response.ok) {
        const data = await response.json()
        setUpdatedAccountData({
          ...updatedAccountData,
          lists: data.lists || [],
        })
        setActiveSort(selectedSortOption)
      }
    } catch (error) {
      console.error("Error sorting lists:", error)
    }
    setIsLoading(false)
    setPersistentFocus(idConstants.listsSort)
  }

  const tableData = lists.map((list: List) => {
    const slug = generateListSlug(list.listName)
    const listUrl = `/account/lists/${list.id}${slug ? `/${slug}` : ""}`
    return [
      <Link
        isUnderlined={false}
        href={listUrl}
        key={list.id}
        onClick={(e: any) => {
          e.preventDefault()
          setPersistentFocus(null)
          const queryIndex = ["lists", list.id]
          if (slug) queryIndex.push(slug)
          router.push(
            {
              pathname: "/account/[[...index]]",
              query: { index: queryIndex },
            },
            listUrl,
            { shallow: true }
          )
        }}
      >
        {list.listName}
      </Link>,
      list.description || (
        <Box as="span" color="ui.gray.dark" fontStyle="italic">
          No description
        </Box>
      ),
      list.recordCount.toString(),
      list.createdDate,
      list.modifiedDate,
      <ListActionsMenu
        key={list.id}
        list={list}
        setStatus={setStatus}
        bannerRef={bannerRef}
      />,
    ]
  })

  return (
    <Flex flexDir="column">
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        mt="m"
        mb="m"
        gap="xs"
      >
        <CreateListButton setStatus={setStatus} bannerRef={bannerRef} />
        <ListSort
          ref={sortMenuRef}
          selectedValue={activeSort}
          sortOptions={listsSortOptions}
          handleSortChange={handleSortChange}
        />
      </Flex>
      <div tabIndex={-1} ref={bannerRef}>
        {status && <StatusBanner type={status.type} message={status.message} />}
      </div>
      <Box display="grid" mt="xs">
        {isLoading ? (
          loader
        ) : (
          <Table
            className={styles.listsTable}
            columnHeaders={[
              "List name",
              "List description",
              "Records",
              "Date created",
              "Date modified",
              "Action",
            ]}
            columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
            columnStyles={[
              { width: 320, minWidth: 240 },
              { width: "auto", minWidth: 240 },
              { width: 160, minWidth: 120 },
              { width: 160, minWidth: 120 },
              { width: 160, minWidth: 120 },
              { width: 120, minWidth: 128 },
            ]}
            tableData={tableData}
            isScrollable
            showRowDividers
            my={{ base: 0, md: "s" }}
            data-testid="list-table"
          />
        )}
      </Box>
    </Flex>
  )
}

export default ListsDisplay
