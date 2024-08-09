import React, { useEffect, useState } from "react"
import {
  Box,
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
  timeoutWindow = 2,
}: {
  expirationTime: string
  stayLoggedIn: () => void
  timeoutWindow?: number
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const redirectUri = useLogoutRedirect()
  const logOutAndRedirect = () => {
    // If patron clicked Log Out before natural expiration of cookie,
    // explicitly delete it:
    deleteCookie("accountPageExp")
    router.push(redirectUri)
  }

  const [timeUntilExpiration, setTimeUntilExpiration] = useState(
    buildTimeLeft(expirationTime)
  )

  if (
    typeof document !== "undefined" &&
    !document.cookie.includes("accountPageExp")
  ) {
    logOutAndRedirect()
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const { minutes, seconds } = buildTimeLeft(expirationTime)
      if (minutes < timeoutWindow) setOpen(true)
      setTimeUntilExpiration({
        minutes,
        seconds,
      })
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  })

  if (timeUntilExpiration.minutes <= 0 && timeUntilExpiration.seconds <= 0) {
    logOutAndRedirect()
  }
  if (!open) return null

  return (
    <Box
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
          <Box as="span">
            {`${timeUntilExpiration.minutes}:${
              timeUntilExpiration.seconds < 10 ? "0" : ""
            }${timeUntilExpiration.seconds}`}
          </Box>
        </CardHeading>
        <CardContent>
          <CardActions className={styles.modalButtons}>
            <Spacer />
            <Button
              buttonType="secondary"
              onClick={logOutAndRedirect}
              id="logout-button"
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
    </Box>
  )
}

export default TimedLogoutModal
