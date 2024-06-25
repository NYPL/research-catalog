/* global document */
import { useModal } from "@nypl/design-system-react-components"
import {
  deleteCookie,
  incrementTime,
  setCookieWithExpiration,
  getTimeLeft,
} from "../../utils/cookieUtils"
import { useLogoutRedirect } from "../../server/auth"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

const TML = () => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const warningWindow = 2 * 1000
  const [timeTillCookieExpires, setTimeTillCookieExpires] = useState(null)
  console.log({ timeTillCookieExpires })
  const logout = useCallback(() => {
    console.log("log me out")
    closeModal()
  }, [closeModal])

  const stayLoggedIn = () => {
    console.log("stay logged in")
    setTimeTillCookieExpires(10 * 1000)
    closeModal()
  }

  const modalProps = {
    type: "confirmation",
    headingText: "Your session is about to expire",
    bodyContent: "in x minutes",
    confirmButtonLabel: "log me out",
    closeButtonLabel: "stay logged in",
    onCancel: stayLoggedIn,
    onConfirm: logout,
  }
  useEffect(() => {
    let warningWindowTimeout
    const timeoutAlertTimer = setTimeout(() => {
      openModal()
      warningWindowTimeout = setTimeout(() => {
        console.log("warningWindow timeout")
        logout()
      }, warningWindow)
    }, timeTillCookieExpires - warningWindow)
    return () => {
      clearTimeout(timeoutAlertTimer)
      clearTimeout(warningWindowTimeout)
    }
  }, [openModal, timeTillCookieExpires, warningWindow, logout])

  useEffect(() => {
    console.log("useEffect")
    const expiration = incrementTime(1)
    setCookieWithExpiration("accountPageExp", expiration, expiration)
    setTimeTillCookieExpires(getTimeLeft(document.cookie["accountPageExp"]))
  }, [])

  return <Modal {...modalProps} />
}

export default TML
