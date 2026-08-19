import { Box, List, Heading } from "@nypl/design-system-react-components"
import Barcode from "react-barcode"

import styles from "../../../styles/components/MyAccount.module.scss"

import type { IconListElementPropType } from "./IconListElement"
import { buildListElementsWithIcons } from "./IconListElement"
import UsernameForm from "./Settings/UsernameForm"
import { useContext, useState } from "react"
import { StatusBanner } from "./Settings/StatusBanner"
import type { StatusBannerState } from "./Settings/StatusBanner"
import { idConstants } from "../../context/FocusContext"
import PasswordForm from "./Settings/PasswordForm"
import ContactInputForm from "./Settings/ContactInputForm"
import { PatronDataContext } from "../../context/PatronDataContext"
import ContactSelectForm from "./Settings/ContactSelectForm"

const ProfileTab = () => {
  const {
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
  const [status, setStatus] = useState<StatusBannerState | null>(null)
  const [editingField, setEditingField] = useState<string>("")

  const settingsState = {
    setStatus,
    editingField,
    setEditingField,
  }

  const accountDetailsData = (
    [
      { icon: "actionIdentityFilled", term: "Name", description: patron.name },
      {
        icon: "actionIdentity",
        term: "Username",
        description: (
          <UsernameForm patron={patron} settingsState={settingsState} />
        ),
      },
      {
        icon: "actionLockClosed",
        term: "PIN/Password",
        description: (
          <PasswordForm patron={patron} settingsState={settingsState} />
        ),
      },
      {
        icon: "actionPayment",
        term: "Library card number",
        description: (
          <>
            {patron.formattedBarcode}
            <Box
              role="img"
              aria-label="barcode"
              width="265px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="8px"
            >
              <Barcode
                margin={0}
                value={patron.barcode}
                format="codabar"
                displayValue={false}
                width={3}
                height={64}
                flex-shrink={1}
              />
            </Box>
          </>
        ),
      },
      {
        icon: "clock",
        term: "Expiration date",
        description: patron.expirationDate,
      },
    ] as IconListElementPropType[]
  )
    .filter((data) => data.description)
    .map(buildListElementsWithIcons)

  const contactDetailsData = (
    [
      {
        icon: "communicationCall",
        term: "Phone",
        description: (
          <ContactInputForm
            patronData={patron}
            settingsState={settingsState}
            inputType="phones"
          />
        ),
      },
      {
        icon: "communicationEmail",
        term: "Email",
        description: (
          <ContactInputForm
            patronData={patron}
            settingsState={settingsState}
            inputType="emails"
          />
        ),
      },
      {
        icon: "communicationChatBubble",
        term: "Notification preference",
        description: (
          <ContactSelectForm
            patronData={patron}
            settingsState={settingsState}
            pickupLocations={pickupLocations}
            type="notification"
          />
        ),
      },
      {
        icon: "actionHome",
        term: "Home library",
        description: (
          <ContactSelectForm
            patronData={patron}
            settingsState={settingsState}
            pickupLocations={pickupLocations}
            type="library"
          />
        ),
      },
    ] as IconListElementPropType[]
  ).map(buildListElementsWithIcons)

  return (
    <>
      {status && (
        <div
          id={idConstants.accountStatusBanner}
          tabIndex={-1}
          style={{ marginTop: "32px", marginBottom: "32px" }}
        >
          <StatusBanner type={status.type} message={status.message} />
        </div>
      )}
      <List
        className={styles.myAccountList}
        id="my-account-account-details"
        title={<Heading level="h4">Account details</Heading>}
        variant="dl"
        sx={{
          border: "none",
          marginY: "l",
        }}
      >
        {accountDetailsData}
      </List>
      <List
        className={styles.myAccountList}
        id="my-account-contact-details"
        title={<Heading level="h4">Contact details and preferences</Heading>}
        variant="dl"
        sx={{
          borderTop: "1px",
          borderColor: "ui.border.default",
          borderBottom: "none",
          h4: {
            marginTop: "l",
          },
        }}
      >
        {contactDetailsData}
      </List>
    </>
  )
}

export default ProfileTab
