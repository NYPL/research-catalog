import { Flex, Banner } from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import EmailForm from "./EmailForm"

const NewAccountSettingsTab = () => {
  const {
    updatedAccountData: { patron },
  } = useContext(PatronDataContext)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)

  return (
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
      {isFailure && (
        <Banner
          isDismissible
          content={
            <div style={{ alignItems: "center" }}>
              Your changes were not saved.
            </div>
          }
          type="warning"
          sx={{ marginTop: "m" }}
        />
      )}
      <Flex sx={{ marginTop: "xl" }}>
        <EmailForm
          patronData={patron}
          setIsSuccess={setIsSuccess}
          setIsFailure={setIsFailure}
        />
      </Flex>
    </>
  )
}

export default NewAccountSettingsTab
