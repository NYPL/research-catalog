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
  Link as DSLink,
} from "@nypl/design-system-react-components"
import type { SierraCodeName } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { useState, useRef } from "react"
import { BASE_URL } from "../../../config/constants"

interface UpdateLocationPropsType {
  holdId: string
  pickupLocation: SierraCodeName
  pickupLocationOptions: SierraCodeName[]
  key: number
  patronId: number
  updateHoldLocation: (holdId: string, location: SierraCodeName) => void
}

const UpdateLocation = ({
  updateHoldLocation,
  pickupLocationOptions,
  patronId,
  holdId,
  pickupLocation,
  key,
}: UpdateLocationPropsType) => {
  const { Modal, onOpen: openModal, onClose: closeModal } = useModal()
  const [selectedLocation, setSelectedLocation] = useState(pickupLocation)
  const locationsWithSelectedFirst = useRef([
    selectedLocation,
    ...pickupLocationOptions.filter((loc) => loc.code !== pickupLocation.code),
  ]).current
  const defaultModalProps = (selected: SierraCodeName) => ({
    bodyContent: (
      <Box className={styles.modalBody}>
        <Select
          value={selected.code}
          onChange={(e: { target: HTMLInputElement }) => {
            const newLocation = locationsWithSelectedFirst.find(
              (loc) => e.target.value === loc.code
            )
            setSelectedLocation(() => {
              // modalProps have to be explicitly updated here because
              // of how useModal works.
              setModalProps(defaultModalProps(newLocation))
              return newLocation
            })
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
    onClose: async (e) => {
      if (!e) {
        closeModal()
      }
      console.log(selected.code)
      const response = await fetch(
        `${BASE_URL}/api/account/holds/update/${holdId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            pickupLocation: selected.code,
            patronId: `${patronId}`,
          }),
        }
      )
      if (response.status == 200) {
        // Open next modal to confirm request has been canceled.
        setModalProps(successModalProps(selected))
      } else setModalProps(failureModalProps)
    },
    headingText: (
      <Heading className={styles.modalHeading}>
        <Text sx={{ marginBottom: 0 }}>
          {" "}
          Where would you like to pick up this item?{" "}
        </Text>
      </Heading>
    ),
  })

  const [modalProps, setModalProps] = useState(
    defaultModalProps(selectedLocation)
  )

  const successModalProps = (newLocation) => ({
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l" }}>
          Your item will be available for pickup at the {newLocation.name}{" "}
          Library.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <>
          <Icon
            size="large"
            name="actionCheckCircleFilled"
            color="ui.success.primary"
          />
          <Text sx={{ marginBottom: 0 }}> Location change successful </Text>
        </>
      </Heading>
    ),
    onClose: () => {
      updateHoldLocation(holdId, newLocation)
      closeModal()
    },
  })
  const failureModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          We were unable to change the pickup location. Please contact{" "}
          <DSLink href="https://www.nypl.org/get-help/contact-us">
            AskNYPL
          </DSLink>{" "}
          for further assistance.
        </Text>
      </Box>
    ),
    onClose: () => {
      setModalProps(defaultModalProps(selectedLocation))
      closeModal()
    },
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
        sx={{ paddingLeft: 0 }}
        size="small"
        onClick={openModal}
        id={`update-pickup-location-${key}`}
        buttonType="text"
      >
        <Icon name="editorMode" align="left" size="small"></Icon>
        <Text className={styles.changeLocation}>Change location</Text>
      </Button>
      <Modal {...modalProps} />
    </>
  )
}
export default UpdateLocation
