import {
  Box,
  Icon,
  useModal,
  Text,
  Heading,
  Button,
  Select,
} from "@nypl/design-system-react-components"
import type { SierraCodeName } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { useState } from "react"

import { pickupLocations } from "../../../../__test__/fixtures/myAccountFixtures"

interface UpdateLocationPropsType {
  selectedLocation: string
  // locations: SierraCodeName[]
  key: number
}

const UpdateLocation = ({ selectedLocation, key }: UpdateLocationPropsType) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const [updatedLocation, setUpdatedLocation] = useState(selectedLocation)
  const defaultModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Select
          id={`update-location-selector-${key}`}
          labelText="Pickup location"
          showLabel
          name={"pickup-location"}
        >
          {pickupLocations.map((location, locationKey) => {
            return (
              <option
                key={`pickupLocation-option-${key}${locationKey}`}
                value={location.code}
              >
                {location.name}
              </option>
            )
          })}
        </Select>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <Text sx={{ marginBottom: 0 }}>
          {" "}
          Where would you like to pick up this item?{" "}
        </Text>
      </Heading>
    ),
  }
  const [modalProps, setModalProps] = useState(defaultModalProps)
  const successModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l" }}>
          Your item will be available for pickup at the {selectedLocation}{" "}
          Library.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <Icon
          size="large"
          name="actionCheckCircleFilled"
          color="ui.success.primary"
        />
        <Text sx={{ marginBottom: 0 }}> Location change successful </Text>
      </Heading>
    ),
  }
  const failureModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          We were unable to change the pickup location because this item is
          already in transit to the original location.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          <Text sx={{ marginBottom: 0 }}> Location change failed </Text>
        </>
      </Heading>
    ),
  }

  return (
    <>
      <Button
        onClick={openModal}
        id={`update-pickup-location-${key}`}
        buttonType="text"
      >
        <Icon
          sx={{ marginLeft: "xs" }}
          name="socialTwitter"
          align="left"
          size="small"
        ></Icon>
        Update location
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default UpdateLocation
