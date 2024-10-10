import {
  SkeletonLoader,
  Flex,
  Banner,
} from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import EmailForm from "./EmailForm"

const NewAccountSettingsTab = () => {
  const {
    updatedAccountData: { patron },
  } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  return isLoading ? (
    <SkeletonLoader contentSize={2} showImage={false} headingSize={0} />
  ) : (
    <>
      {isSuccess && (
        <Banner
          isDismissible
          content={
            <div style={{ alignItems: "center" }}>Your changes were saved.</div>
          }
          type="positive"
          sx={{ marginTop: "m" }}
        />
      )}
      <Flex sx={{ marginTop: "xl" }}>
        <EmailForm
          patronData={patron}
          setIsLoading={setIsLoading}
          setIsSuccess={setIsSuccess}
        />
      </Flex>
    </>
  )
}

export default NewAccountSettingsTab
