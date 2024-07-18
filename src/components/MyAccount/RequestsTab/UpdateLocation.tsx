// Modal onClose
import {
  Box,
  Icon,
  useModal,
  Text,
  Button,
  Select,
  Link as DSLink,
  type DefaultModalProps,
  type ConfirmationModalProps,
  type BaseModalProps,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import type { Hold, SierraCodeName } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { useContext, useState } from "react"
import { BASE_URL } from "../../../config/constants"
import { PatronDataContext } from "../../../context/PatronDataContext"

interface UpdateLocationPropsType {
  hold: Hold
  pickupLocation: SierraCodeName
  pickupLocationOptions: SierraCodeName[]
  key: number
  patronId: number
}

const UpdateLocation = ({
  pickupLocationOptions,
  patronId,
  hold,
  pickupLocation,
  key,
}: UpdateLocationPropsType) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
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
    closeButtonLabel: "Cancel",
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
        `${BASE_URL}/api/account/holds/update/${hold.id}`,
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
      <h5 className={styles.modalHeading}>
        Where would you like to pick up this item?
      </h5>
    ),
  })

  const [modalProps, setModalProps] = useState<BaseModalProps>(
    confirmLocationChangeModalProps(pickupLocation) as ConfirmationModalProps
  )

  const successModalProps = (newLocation: SierraCodeName) => ({
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          Your item will be available for pickup at the {newLocation.name}{" "}
          Library.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <h5 className={styles.modalHeading}>
        <>
          <Icon
            size="large"
            name="actionCheckCircleFilled"
            color="ui.success.primary"
          />
          Location change successful
        </>
      </h5>
    ),
    onClose: () => {
      setModalProps(
        confirmLocationChangeModalProps(newLocation) as ConfirmationModalProps
      )
      closeModal()
      getMostUpdatedSierraAccountData()
    },
  })
  const failureModalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
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
      <h5 className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          Location change failed
        </>
      </h5>
    ),
  }
  const buttonLabel = "Change location"

  return (
    <>
      <Button
        aria-label={`${buttonLabel} for ${hold.title}`}
        size="small"
        pl={0}
        onClick={openModal}
        id={`update-pickup-location-${key}`}
        buttonType="text"
      >
        <Icon name="editorMode" align="left" size="medium"></Icon>
        <Text fontSize={-1} className={styles.changeLocation}>
          {buttonLabel}
        </Text>
      </Button>
      <Modal {...modalProps} />
    </>
  )
}
export default UpdateLocation
