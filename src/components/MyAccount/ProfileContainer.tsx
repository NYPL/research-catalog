import { useContext } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import FeesBanner from "./FeesBanner"
import MyAccountTabs from "./MyAccountTabs"
import { Box, Flex, Heading } from "@nypl/design-system-react-components"
import { FeaturePopup } from "../Banners/FeaturePopup"

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
      <Heading level="h3" mb={{ md: "xs" }}>
        My account
      </Heading>
      <Box position="relative" display="inline-block">
        <Box
          position="absolute"
          sx={{
            bottom: "-250px",
            left: { base: 42, sm: 200, md: 325, lg: 370 },
            zIndex: "100",
          }}
        >
          <FeaturePopup
            id="listAccountPopup"
            titleUpdate="Save to lists"
            content="You can now save records to one or more lists. Lists can be found and managed in the 'Lists' tab in your patron account."
            pointerDirection="up"
            pointerRight={{ base: "10px", sm: "50px", md: "150px" }}
          />
        </Box>
      </Box>
      <MyAccountTabs activePath={tabsPath} />
    </>
  )
}

export default ProfileContainer
