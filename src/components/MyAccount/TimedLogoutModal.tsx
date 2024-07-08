/* global document */
import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeading,
  Spacer,
} from "@nypl/design-system-react-components"

import { deleteCookie } from "../../utils/cookieUtils"
import { useLogoutRedirect } from "../../server/auth"
import { useRouter } from "next/router"
import styles from "../../../styles/components/TimedLogoutModal.module.scss"

/**
 * This renders a modal interface based on an early version from the
 * Reservoir Design System through the `old-ds-modal` CSS class.
 */
const TimedLogoutModal = ({ stayLoggedIn }) => {
  const router = useRouter()
  const [expTime, setExpTime] = useState("")
  const [timeLeft, setTimeLeft] = useState({ minutes: 50, seconds: 0 })
  const [open, setOpen] = useState(false)
  const redirectUri = useLogoutRedirect()
  const logOutAndRedirect = () => {
    // If patron clicked Log Out before natural expiration of cookie,
    // explicitly delete it:
    deleteCookie("accountPageExp")
    router.push(redirectUri)
  }

  if (
    typeof document !== "undefined" &&
    !document.cookie.includes("accountPageExp")
  ) {
    logOutAndRedirect()
  }

  useEffect(() => {
    const timeout = setInterval(() => {
      const left = (new Date(expTime).getTime() - new Date().getTime()) / 1000
      const minutes = Math.ceil(left / 60)

      const seconds = Math.ceil(left) % 60
      if (minutes < 5) setOpen(true)
      setTimeLeft(() => {
        return {
          minutes,
          seconds,
        }
      })
    }, 1000)
    setExpTime(
      document.cookie
        .split(";")
        .find((el) => el.includes("accountPageExp"))
        .split("=")[1]
    )
    return () => {
      clearInterval(timeout)
    }
  })

  // Theoretically, accountPageExp should disappear after 5mins, causing
  // logOutAndRedirect() to be fired above, but let's make sure a failure
  // there never allows the timer to pass zero:
  if (timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
    logOutAndRedirect()
  }
  // Show warning when 2m remaining:

  if (!open) return null

  return (
    <div
      tabIndex={0}
      className={styles.logoutModalContainer}
      role="dialog"
      aria-labelledby="logout-modal-heading"
      aria-describedby="logout-modal-content"
    >
      <Card
        layout="row"
        isBordered={true}
        backgroundColor="ui.bg.default"
        className={styles.logoutModalBody}
      >
        <CardHeading
          sx={{ display: "flex", justifyContent: "space-between" }}
          subtitle="Do you want to stay logged in?"
          size="heading6"
        >
          Your session is about to expire
          <span>
            {`${timeLeft.minutes}:${timeLeft.seconds < 10 ? "0" : ""}${
              timeLeft.seconds
            }`}
          </span>
        </CardHeading>
        <CardContent>
          <CardActions className={styles.modalButtons}>
            <Spacer />
            <Button
              buttonType="secondary"
              onClick={logOutAndRedirect}
              id="logout -button"
            >
              Log out
            </Button>
            <Button
              onClick={() => {
                stayLoggedIn()
                setOpen(false)
              }}
              id="logged-in-button"
            >
              Stay logged in
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  )
}

export default TimedLogoutModal
