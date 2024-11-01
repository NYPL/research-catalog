import { Flex, Banner } from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import PhoneEmailForm from "./PhoneEmailForm"
import HomeLibraryNotificationForm from "./HomeLibraryNotificationForm"

const NewAccountSettingsTab = () => {
  const {
    updatedAccountData: { patron, pickupLocations },
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
      <Flex flexDir="column" sx={{ marginTop: "xl", gap: "s" }}>
        <PhoneEmailForm
          patronData={patron}
          setIsSuccess={setIsSuccess}
          setIsFailure={setIsFailure}
          inputType="phones"
        />
        <PhoneEmailForm
          patronData={patron}
          setIsSuccess={setIsSuccess}
          setIsFailure={setIsFailure}
          inputType="emails"
        />
        <HomeLibraryNotificationForm
          patronData={patron}
          pickupLocations={pickupLocations}
          setIsSuccess={setIsSuccess}
          setIsFailure={setIsFailure}
          type="library"
        />
        <HomeLibraryNotificationForm
          patronData={patron}
          pickupLocations={pickupLocations}
          setIsSuccess={setIsSuccess}
          setIsFailure={setIsFailure}
          type="notification"
        />
      </Flex>
    </>
  )
}

export default NewAccountSettingsTab
