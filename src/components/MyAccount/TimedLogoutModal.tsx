/* global document */
import { useModal } from "@nypl/design-system-react-components"
import { deleteCookie, incrementTime } from "../../utils/cookieUtils"
import { useLogoutRedirect } from "../../server/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const TimedLogoutModal = () => {
  const getTimeLeft = (expTime) => {
    return (new Date(expTime).getTime() - new Date().getTime()) / 1000
  }

  const resetCountdown = () => {
    const inFive = incrementTime(5)
    document.cookie = `accountPageExp=${inFive}; expires=${inFive}`
    setTimeLeft(getTimeLeft(inFive))
  }

  const accountPageExp = document.cookie["accountPageExp"]
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const redirectUrl = useLogoutRedirect()
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(accountPageExp))

  const logOutAndRedirect = () => {
    // If patron clicked Log Out before natural expiration of cookie,
    // explicitly delete it:
    deleteCookie("accountPageExp")
    router.push(redirectUrl)
  }

  const props = {
    type: "confirmation",
    heading: "Your session is about to expire",
    body: <p>in x minutes</p>,
    confirmButton: "Stay logged in",
    closeButtonLabel: "Log me out",
    onConfirm: () => {
      console.log("stay logged in")
      resetCountdown()
      closeModal()
    },
    onCancel: () => {
      console.log("log me out")
      logOutAndRedirect()
      closeModal()
    },
  }
  useEffect(() => {
    const timeoutAlertTimer = setTimeout(() => {
      openModal()
    }, timeLeft)
    return () => clearTimeout(timeoutAlertTimer)
  }, [openModal, timeLeft])

  return <Modal modalProps={props} />
}
