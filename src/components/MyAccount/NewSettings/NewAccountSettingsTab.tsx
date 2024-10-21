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
      {(isSuccess || isFailure) && (
        <Banner
          isDismissible
          content={
            <div style={{ alignItems: "center" }}>
              {isFailure
                ? "Your changes were not saved."
                : "Your changes were saved."}
            </div>
          }
          type={isFailure ? "warning" : "positive"}
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
