import { SkeletonLoader, Flex } from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import EmailForm from "./EmailForm"

const NewAccountSettingsTab = () => {
  const {
    patronDataLoading,
    getMostUpdatedSierraAccountData,
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)

  return isLoading ? (
    <SkeletonLoader showImage={false} />
  ) : (
    <Flex sx={{ marginTop: "xl" }}>
      <EmailForm patronData={patron} />
    </Flex>
  )
}

export default NewAccountSettingsTab
