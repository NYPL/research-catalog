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

import { buildTimeLeft, deleteCookie } from "../../utils/cookieUtils"
import { useLogoutRedirect } from "../../server/auth"
import { useRouter } from "next/router"
import styles from "../../../styles/components/TimedLogoutModal.module.scss"

/**
 * This renders a modal interface based on an early version from the
 * Reservoir Design System through the `old-ds-modal` CSS class.
 */
const TimedLogoutModal = ({
  stayLoggedIn,
  expirationTime,
  timeoutWindow = 5,
}: {
  expirationTime: string
  stayLoggedIn: () => void
  timeoutWindow?: number
}) => {
  const router = useRouter()
  const redirectUri = useLogoutRedirect()
  const logOutAndRedirect = () => {
    // If patron clicked Log Out before natural expiration of cookie,
    // explicitly delete it:
    deleteCookie("accountPageExp")
    router.push(redirectUri)
  }
  if (!expirationTime) {
    logOutAndRedirect()
  }
  const [timeUntilExpiration, setTimeUntilExpiration] = useState(
    buildTimeLeft(expirationTime)
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timeout = setInterval(() => {
      const { minutes, seconds } = buildTimeLeft(expirationTime)
      if (minutes < timeoutWindow) setOpen(true)
      setTimeUntilExpiration(() => {
        return {
          minutes,
          seconds,
        }
      })
    }, 1000)
    return () => {
      clearInterval(timeout)
    }
  })

  // Theoretically, accountPageExp should disappear after 5mins, causing
  // logOutAndRedirect() to be fired above, but let's make sure a failure
  // there never allows the timer to pass zero:
  if (timeUntilExpiration.minutes <= 0 && timeUntilExpiration.seconds <= 0) {
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
            {`${timeUntilExpiration.minutes}:${
              timeUntilExpiration.seconds < 10 ? "0" : ""
            }${timeUntilExpiration.seconds}`}
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
