import { useContext } from "react"
import { Box, Flex, Heading } from "@nypl/design-system-react-components"
import { PatronDataContext } from "../../../context/PatronDataContext"
import Link from "../../Link/Link"
import type List from "../../../models/List"
import { useRouter } from "next/router"

const ListDisplay = ({ list }: { list?: List }) => {
  // Maybe..
  const {
    updatedAccountData: { lists: listResults, patron },
  } = useContext(PatronDataContext)

  const router = useRouter()

  return (
    <Flex flexDir="column">
      <Box mb="l">
        <Link
          variant="backwards"
          href="/account/lists"
          onClick={(e: any) => {
            e.preventDefault()
            router.push("/account/lists", undefined, { shallow: true })
          }}
        >
          Back to all lists
        </Link>
      </Box>
      {list ? (
        <>
          <Heading level="h2" size="heading3">
            {list.listName}
          </Heading>
          {list.description && (
            <Box mb="m" color="ui.gray.dark">
              {list.description}
            </Box>
          )}
          <Box mt="m"></Box>
        </>
      ) : (
        <Box>There was an error accessing your list.</Box>
      )}
    </Flex>
  )
}

export default ListDisplay
