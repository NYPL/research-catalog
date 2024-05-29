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
  type DefaultModalProps,
  type ConfirmationModalProps,
  type BaseModalProps,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import type { SierraCodeName } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { useState } from "react"
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
  const locationsWithSelectedFirst = [
    pickupLocation,
    ...pickupLocationOptions.filter(
      (loc) => loc.code.trim() !== pickupLocation.code.trim()
    ),
  ]
  const confirmLocationChangeModalProps = (selected: SierraCodeName) => ({
    type: "confirmation",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Select
          value={selected.code}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const newLocation = locationsWithSelectedFirst.find(
              (loc) => e.currentTarget.value === loc.code
            )
            setModalProps(
              confirmLocationChangeModalProps(
                newLocation
              ) as ConfirmationModalProps
            )
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
    closeButtonLabel: "Cancel location change",
    confirmButtonLabel: "Confirm location",
    onCancel: () => {
      closeModal()
    },
    onConfirm: async () => {
      setModalProps({
        ...confirmLocationChangeModalProps(selected),
        bodyContent: <SkeletonLoader showImage={false} />,
      } as ConfirmationModalProps)
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
        setModalProps(successModalProps(selected) as DefaultModalProps)
      } else setModalProps(failureModalProps as DefaultModalProps)
    },
    headingText: (
      <Heading className={styles.modalHeading}>
        <Text mb={0}> Where would you like to pick up this item? </Text>
      </Heading>
    ),
  })

  const [modalProps, setModalProps] = useState<BaseModalProps>(
    confirmLocationChangeModalProps(pickupLocation) as ConfirmationModalProps
  )

  const successModalProps = (newLocation: SierraCodeName) => ({
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text ml="l">
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
          <Text mb={0}> Location change successful </Text>
        </>
      </Heading>
    ),
    onClose: () => {
      updateHoldLocation(holdId, newLocation)
      setModalProps(
        confirmLocationChangeModalProps(newLocation) as ConfirmationModalProps
      )
      closeModal()
    },
  })
  const failureModalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text ml="l" mr="m">
          We were unable to change the pickup location. Please contact{" "}
          <DSLink href="https://www.nypl.org/get-help/contact-us">
            AskNYPL
          </DSLink>{" "}
          for further assistance.
        </Text>
      </Box>
    ),
    onClose: () => {
      setModalProps(
        confirmLocationChangeModalProps(
          pickupLocation
        ) as ConfirmationModalProps
      )
      closeModal()
    },
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          <Text mb={0}> Location change failed </Text>
        </>
      </Heading>
    ),
  }
  return (
    <>
      <Button
        pl={0}
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
