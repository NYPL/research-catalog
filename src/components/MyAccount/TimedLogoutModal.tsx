/* global document */
import React, { useEffect } from "react"
import { Button } from "@nypl/design-system-react-components"

import { deleteCookie } from "../../utils/cookieUtils"
import { useLogoutRedirect } from "../../server/auth"
import { useRouter } from "next/router"

/**
 * This renders a modal interface based on an early version from the
 * Reservoir Design System through the `old-ds-modal` CSS class.
 */
const TimedLogoutModal = ({ stayLoggedIn }) => {
  const router = useRouter()

  const [update, setUpdate] = React.useState(false)
  const redirectUri = useLogoutRedirect()

  const logOutAndRedirect = () => {
    // If patron clicked Log Out before natural expiration of cookie,
    // explicitly delete it:
    deleteCookie("accountPageExp")
    router.push(redirectUri)
  }

  let minutes = 0
  let seconds = 0

  // if (
  //   typeof document !== "undefined" &&
  //   !document.cookie.includes("accountPageExp")
  // ) {
  //   logOutAndRedirect()
  // } else if (typeof document !== "undefined") {
  //   const expTime = document.cookie
  //     .split(";")
  //     .find((el) => el.includes("accountPageExp"))
  //     .split("=")[1]

  //   const timeLeft = (new Date(expTime).getTime() - new Date().getTime()) / 1000

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       setUpdate(!update)
  //     }, 1000)

  //     return () => {
  //       clearTimeout(timeout)
  //     }
  //   })

  //   minutes = Math.max(timeLeft / 60)
  //   seconds = Math.max(timeLeft % 60)

  //   // Theoretically, accountPageExp should disappear after 5mins, causing
  //   // logOutAndRedirect() to be fired above, but let's make sure a failure
  //   // there never allows the timer to pass zero:
  //   if (timeLeft <= 0) {
  //     logOutAndRedirect()
  //   }
  // }

  // Show warning when 2m remaining:
  const open = minutes < 2
  if (!open) return null

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div tabIndex="0" className="research-modal timed-logout old-ds-modal">
      <div className="research-modal__content">
        <p>
          Your session is about to expire
          <span className="time-display">
            {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
          </span>
        </p>
        <hr />
        Do you want to stay logged in?
        <div className="button-container">
          <Button
            buttonType="secondary"
            onClick={logOutAndRedirect}
            id="logoff-button"
          >
            Log off
          </Button>
          <Button onClick={stayLoggedIn} id="logged-in-button">
            Stay logged in
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TimedLogoutModal
