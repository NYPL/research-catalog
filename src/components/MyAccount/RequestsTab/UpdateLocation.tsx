// Modal onClose
import {
  Box,
  Icon,
  useModal,
  Text,
  Button,
  Select,
  Link,
  type DefaultModalProps,
  type BaseModalProps,
  SkeletonLoader,
  FormField,
  Form,
} from "@nypl/design-system-react-components"
import type { Hold, SierraCodeName } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { useContext, useRef, useState, useEffect, type Dispatch } from "react"
import { BASE_URL } from "../../../config/constants"
import { PatronDataContext } from "../../../context/PatronDataContext"

interface UpdateLocationPropsType {
  hold: Hold
  pickupLocationOptions: SierraCodeName[]
  key: string
  patronId: number
  setLastUpdatedHoldId: Dispatch<string>
  focus: boolean
}

const UpdateLocation = ({
  pickupLocationOptions,
  patronId,
  hold,
  key,
  setLastUpdatedHoldId,
  focus,
}: UpdateLocationPropsType) => {
  const selectRef = useRef(null)
  const updateLocationButtonRef = useRef(null)

  const [focusOnChangeLocationButton, setFocusOnChangeLocationButton] =
    useState(focus)

  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const { Modal, onOpen: openModal, onClose: closeModal } = useModal()

  const locationsWithSelectedFirst = [
    hold.pickupLocation,
    ...pickupLocationOptions.filter(
      (loc) => loc.code.trim() !== hold.pickupLocation.code.trim()
    ),
  ]
  const handleSubmit = async () => {
    const newLocation =
      pickupLocationOptions.find(
        (loc) => loc.code === selectRef.current.value
      ) || hold.pickupLocation
    setModalProps({
      ...selectLocationModalProps,
      bodyContent: <SkeletonLoader showImage={false} />,
      onClose: () => closeModal(),
      closeButtonLabel: "Loading",
    } as DefaultModalProps)
    const response = await fetch(
      `${BASE_URL}/api/account/holds/update/${hold.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          pickupLocation: newLocation.code,
          patronId: `${patronId}`,
        }),
      }
    )
    if (response.status == 200) {
      setModalProps(successModalProps(newLocation) as DefaultModalProps)
      setLastUpdatedHoldId(hold.id)
    } else {
      setModalProps(failureModalProps as DefaultModalProps)
    }
  }

  const selectLocationModalProps = {
    variant: "default",
    bodyContent: (
      <Form
        id={`update-pickup-location-hold-${hold.id}`}
        className={styles.modalBody}
      >
        <FormField>
          <Select
            ref={selectRef}
            value={hold.pickupLocation.code}
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
        </FormField>
        <FormField>
          <Button
            id="submit"
            onClick={handleSubmit}
            className={styles.formButton}
          >
            Confirm location
          </Button>
        </FormField>
      </Form>
    ),
    closeButtonLabel: "Cancel",
    onClose: closeModal,
    headingText: (
      <h5 className={styles.modalHeading}>
        Where would you like to pick up this item?
      </h5>
    ),
  }

  const [modalProps, setModalProps] = useState<BaseModalProps>(
    selectLocationModalProps as DefaultModalProps
  )

  const successModalProps = (newLocation) => ({
    variant: "default",
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
      closeModal()
      if (newLocation.code !== hold.pickupLocation.code) {
        getMostUpdatedSierraAccountData()
      } else {
        setModalProps(selectLocationModalProps as DefaultModalProps)
      }
      setFocusOnChangeLocationButton(true)
    },
  })
  const failureModalProps = {
    variant: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          We were unable to change the pickup location. Please contact{" "}
          <Link href="https://www.nypl.org/get-help/contact-us">AskNYPL</Link>{" "}
          for further assistance.
        </Text>
      </Box>
    ),
    onClose: () => {
      closeModal()
      setModalProps(selectLocationModalProps as DefaultModalProps)
      setFocusOnChangeLocationButton(true)
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

  useEffect(() => {
    if (focusOnChangeLocationButton) {
      updateLocationButtonRef.current.focus()
    }
  }, [focusOnChangeLocationButton])

  return (
    <>
      <Button
        ref={updateLocationButtonRef}
        aria-label={`${buttonLabel} for ${hold.title}`}
        size="small"
        pl={0}
        onClick={openModal}
        id={`update-pickup-location-${key}`}
        variant="text"
        data-testid="change-location-button"
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
