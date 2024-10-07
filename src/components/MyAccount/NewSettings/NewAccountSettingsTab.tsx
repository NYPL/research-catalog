import {
  SkeletonLoader,
  Flex,
  Banner,
} from "@nypl/design-system-react-components"
import { useContext, useEffect, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import EmailForm from "./EmailForm"
import NoJsEmailForm from "./NoJsEmailForm"

const NewAccountSettingsTab = () => {
  const {
    updatedAccountData: { patron },
  } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isJsEnabled, setIsJsEnabled] = useState(false)

  useEffect(() => {
    setIsJsEnabled(true)
  }, [])

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
        {isJsEnabled ? (
          <EmailForm
            patronData={patron}
            setIsLoading={setIsLoading}
            setIsSuccess={setIsSuccess}
          />
        ) : (
          <NoJsEmailForm patronData={patron} />
        )}
      </Flex>
    </>
  )
}

export default NewAccountSettingsTab
