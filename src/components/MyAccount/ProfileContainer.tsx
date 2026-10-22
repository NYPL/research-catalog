import { useContext } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import FeesBanner from "./FeesBanner"
import MyAccountTabs from "./MyAccountTabs"
import { Flex, Heading } from "@nypl/design-system-react-components"

const ProfileContainer = ({ tabsPath }) => {
  const { updatedAccountData } = useContext(PatronDataContext)
  const hasFines = updatedAccountData.fines?.total > 0
  return (
    <>
      <Flex
        gap="s"
        flexDir="column"
        mb={hasFines ? { base: "m", md: "l" } : "xs"}
      >
        {hasFines && <FeesBanner />}
      </Flex>
      <Heading level="h2" size="heading3" mb={{ base: "m", md: "l" }}>
        My account
      </Heading>
      <MyAccountTabs activePath={tabsPath} />
    </>
  )
}

export default ProfileContainer
