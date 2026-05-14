import {
  Box,
  Flex,
  Heading,
  Icon,
  Text,
} from "@nypl/design-system-react-components"
import Link from "../../Link/Link"
import type List from "../../../models/List"
import { useRouter } from "next/router"
import { useFocusContext } from "../../../context/FocusContext"
import ListOptions from "./ListOptions"
import EmptyList from "./EmptyList"
import ListRecordsTable from "./ListRecordsTable"

/* ListDisplay renders the list metadata, list operations, and the ListRecordTable. */

const ListDisplay = ({ list }: { list?: List }) => {
  const router = useRouter()
  const { setPersistentFocus } = useFocusContext()

  const separatingDot = (i) => (
    // @ts-ignore
    <Icon key={`dot-${i}`} size="xxsmall" ml="xs" mr="xs" pb="xxs">
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
        <ListOptions />
      </Flex>
      {list.recordCount > 0 ? <ListRecordsTable list={list} /> : <EmptyList />}
    </Flex>
  )
}

export default ListDisplay
