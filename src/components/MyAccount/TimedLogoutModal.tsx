import {
  Box,
  Card,
  CardHeading,
  CardContent,
  CardActions,
  Spacer,
  Button,
  Text,
} from "@nypl/design-system-react-components"
import React, { useEffect, useState, useCallback, useRef } from "react"
import styles from "../../../styles/components/TimedLogoutModal.module.scss"
import { deleteCookie } from "../../utils/cookieUtils"
import router from "next/router"
import { useLogoutRedirect } from "../../server/auth"

const INACTIVITY_LIMIT = 5 * 60 * 1000 // 5 minutes (milliseconds)
const MODAL_COUNTDOWN = 2 * 60 // 2 minutes (seconds)

/**
 * This renders a modal interface based on an early version from the
 * Reservoir Design System through the `old-ds-modal` CSS class.
 */
const TimedLogoutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [countdown, setCountdown] = useState(MODAL_COUNTDOWN)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const redirectUri = useLogoutRedirect()

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    const expiration = new Date(Date.now() + INACTIVITY_LIMIT).toUTCString()
    const newExpirationTime = `accountPageExp=${expiration}; expires=${expiration}`
    document.cookie = newExpirationTime
    timerRef.current = setTimeout(() => {
      setIsModalOpen(true)
    }, INACTIVITY_LIMIT)
  }, [])

  const startCountdown = () => {
    if (countdownRef.current) clearTimeout(countdownRef.current)
    // Recursively update the countdown and wait one second.
    const tick = () => {
      setCountdown((prev) => {
        if (prev <= 1) {
          logOutAndRedirect()
          return 0
        } else {
          countdownRef.current = setTimeout(tick, 1000)
          return prev - 1
        }
      })
    }
    setCountdown(MODAL_COUNTDOWN)
    countdownRef.current = setTimeout(tick, 1000)
  }

  const stayLoggedIn = () => {
    setIsModalOpen(false)
    setCountdown(MODAL_COUNTDOWN)
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }
    resetInactivityTimer()
  }

  const logOutAndRedirect = () => {
    deleteCookie("accountPageExp")
    router.push(redirectUri)
  }

  const handleActivity = useCallback(() => {
    // Once modal is open, user needs to explicitly click the button to prevent logout,
    // screen interaction isn't enough.
    if (!isModalOpen) {
      resetInactivityTimer()
    }
  }, [])

  useEffect(() => {
    resetInactivityTimer()

    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"]
    events.forEach((event) => window.addEventListener(event, handleActivity))

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      )
      if (timerRef.current) clearTimeout(timerRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [handleActivity, resetInactivityTimer])

  useEffect(() => {
    if (isModalOpen) {
      startCountdown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  return (
    <>
      {isModalOpen && (
        <Box
          tabIndex={0}
          className={styles.logoutModalContainer}
          role="dialog"
          aria-labelledby="logout-modal-heading"
          aria-describedby="logout-modal-content"
          data-testid="logout-modal"
        >
          <Card
            layout="row"
            backgroundColor="ui.bg.default"
            width={{ base: "100%", md: "472px" }}
            className={styles.logoutModalBody}
          >
            <CardHeading
              sx={{ display: "flex", justifyContent: "space-between" }}
              size="heading6"
            >
              Your session is about to expire
              <Box as="span">
                {String(Math.floor(countdown / 60)).padStart(1, "0")}:
                {String(countdown % 60).padStart(2, "0")}
              </Box>
            </CardHeading>
            <CardContent>
              <Text mb="s"> Do you want to stay logged in? </Text>
              <CardActions className={styles.modalButtons}>
                <Spacer />
                <Button
                  variant="secondary"
                  onClick={logOutAndRedirect}
                  id="logout-button"
                >
                  Log out
                </Button>
                <Button onClick={stayLoggedIn} id="logged-in-button">
                  Stay logged in
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  )
}

export default TimedLogoutModal
