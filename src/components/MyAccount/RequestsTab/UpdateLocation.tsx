// @ts-nocheck
// Modal onClose
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
import { useState, useEffect, useRef } from "react"

import { pickupLocations } from "../../../../__test__/fixtures/myAccountFixtures"
import { BASE_URL } from "../../../config/constants"

interface UpdateLocationPropsType {
  holdId: string
  pickupLocation: SierraCodeName
  // locations: SierraCodeName[]
  key: number
}

const UpdateLocation = ({
  holdId,
  pickupLocation,
  key,
}: UpdateLocationPropsType) => {
  const [displayModal, setDisplayModal] = useState(false)
  const { Modal, onOpen: openModal } = useModal()
  const [selectedLocation, setSelectedLocation] = useState(pickupLocation)
  const locationsWithSelectedFirst = useRef([
    selectedLocation,
    ...pickupLocations.filter((loc) => loc.code !== pickupLocation.code),
  ]).current
  const defaultModalProps = (selected) => ({
    bodyContent: (
      <Box className={styles.modalBody}>
        <Select
          value={selected.code}
          onChange={(e: { target: HTMLInputElement }) => {
            const newLocation = locationsWithSelectedFirst.find(
              (loc) => e.target.value === loc.code
            )
            setSelectedLocation(newLocation)
          }}
          id={`update-location-selector-${key}`}
          labelText="Pickup location"
          showLabel
          name={"pickup-location"}
        >
          {locationsWithSelectedFirst.map((location, locationKey) => {
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
    closeButtonLabel: "Confirm location",
    // onClose: async (e) => {
    //   console.log(e)
    //   if (!e) {
    //     console.log("no e")
    //     closeModal()
    //   }
    //   const response = await fetch(`${BASE_URL}/api/account/${holdId}/holds/`, {
    //     method: "PUT",
    //     body: JSON.stringify({ pickupLocation: selectedLocation }),
    //   })
    //   if (response.status == 200) {
    //     // Open next modal to confirm request has been canceled.
    //     setModalProps(successModalProps)
    //   } else setModalProps(failureModalProps)
    // },
    headingText: (
      <Heading className={styles.modalHeading}>
        <Text sx={{ marginBottom: 0 }}>
          {" "}
          Where would you like to pick up this item?{" "}
        </Text>
      </Heading>
    ),
  })

  const [modalProps, setModalProps] = useState(null)
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
  useEffect(() => {
    setModalProps(defaultModalProps(selectedLocation))
  }, [selectedLocation])
  return (
    <>
      <Button
        sx={{ paddingLeft: 0 }}
        size="small"
        onClick={() => {
          openModal()
          setDisplayModal(true)
        }}
        id={`update-pickup-location-${key}`}
        buttonType="text"
      >
        <Icon name="socialTwitter" align="left" size="small"></Icon>
        <Text className={styles.changeLocation}>Change location</Text>
      </Button>
      {displayModal && <Modal {...modalProps} />}
    </>
  )
}

export default UpdateLocation
