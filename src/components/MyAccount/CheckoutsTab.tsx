import {
  Box,
  Button,
  Icon,
  Link,
  Table,
  Text,
  useModal,
} from "@nypl/design-system-react-components"
import type { Checkout, Patron } from "../../types/accountTypes"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config/constants"

const CheckoutsTab = ({
  checkouts,
  patron,
}: {
  checkouts: Checkout[]
  patron: Patron
}) => {
  const checkoutsHeaders = [
    "Title",
    "Barcode",
    "Call number",
    "Due back by",
    "Manage checkout",
  ]

  function RenewButton(checkout, patron) {
    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const { onOpen, Modal } = useModal()
    const [modalProps, setModalProps] = useState(null)
    const successModalProps = {
      bodyContent: (
        <Box
          sx={{
            fontSize: "desktop.body.body1.light",
            display: "flex",
            marginTop: "-xs",
          }}
        >
          <Text sx={{ marginLeft: "l" }}>
            Your item was renewed. It is now due back on{" "}
            {getDueDate(checkout.date)}.
          </Text>
        </Box>
      ),
      closeButtonLabel: "OK",
      headingText: (
        <Box
          sx={{
            fontSize: "desktop.heading.heading5",
            marginTop: "l",
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <Icon
            size="large"
            name="actionCheckCircleFilled"
            color="ui.success.primary"
            sx={{ marginTop: "4px" }}
          />
          <Text sx={{ marginBottom: "0px" }}> Renewal successful </Text>
        </Box>
      ),
    }
    const failureModalProps = {
      bodyContent: (
        <Box
          sx={{
            fontSize: "desktop.body.body1.light",
            display: "flex",
            marginTop: "-xs",
          }}
        >
          <Text sx={{ marginLeft: "l", marginRight: "m" }}>
            We were unable to renew your item. Please try again or{" "}
            <Link href="https://www.nypl.org/get-help/contact-us">
              contact us
            </Link>{" "}
            for assistance.
          </Text>
        </Box>
      ),
      closeButtonLabel: "OK",
      headingText: (
        <Box
          sx={{
            fontSize: "desktop.heading.heading5",
            paddingTop: "m",
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <Icon
            size="large"
            name="errorFilled"
            color="ui.error.primary"
            sx={{ marginTop: "4px" }}
          />
          <Text sx={{ marginBottom: "0px" }}> Renewal failed </Text>
        </Box>
      ),
    }

    useEffect(() => {
      const lastDisabledTime = localStorage.getItem(
        `lastDisabledTime-${checkout.id}`
      )
      if (lastDisabledTime) {
        const twentyFourHoursAgo = new Date().getTime() - 8640000
        if (parseInt(lastDisabledTime, 10) > twentyFourHoursAgo) {
          setButtonDisabled(true)
        }
      }
    }, [])

    const handleClick = async () => {
      const response = await fetch(
        `${BASE_URL}/api/account/checkouts/renew/${checkout.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patronId: patron.id }),
        }
      )
      const responseData = await response.json()
      if (responseData.message == "Renewed") {
        setButtonDisabled(true)
        setModalProps(successModalProps)
        onOpen()
        localStorage.setItem(
          `lastDisabledTime-${checkout.id}`,
          new Date().getTime().toString()
        )
      } else {
        setModalProps(failureModalProps)
        onOpen()
        //TO-DO: Log error console.log("error", responseData)
      }
    }

    return (
      <>
        <Button
          sx={{
            width: "-webkit-fill-available",
          }}
          buttonType="secondary"
          id={`renew-${checkout.id}`}
          onClick={handleClick}
          isDisabled={isButtonDisabled}
        >
          Renew
        </Button>
        <Modal {...modalProps} />
      </>
    )
  }

  function getDueDate(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const day = d.getDate()
    const month = d.toLocaleString("default", { month: "long" })
    return month + " " + day + ", " + year
  }

  function getTitle(checkout) {
    const href = checkout.isResearch
      ? `https://nypl.org/research/research-catalog/bib/b${checkout.bibId}`
      : `https://nypl.na2.iiivega.com/search/card?recordId=${checkout.bibId}`
    return checkout.isNyplOwned ? (
      <Link href={href}>{checkout.title}</Link>
    ) : (
      <Text>{checkout.title}</Text>
    )
  }

  const checkoutsData = checkouts.map((checkout) => [
    getTitle(checkout),
    checkout.barcode,
    checkout.callNumber,
    getDueDate(checkout.dueDate),
    checkout.isResearch ? null : RenewButton(checkout, patron),
  ])
  return (
    <>
      {checkouts.length === 0 && (
        <Box
          sx={{
            fontSize: "desktop.body.body1",
            marginTop: "m",
            marginBottom: "m",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <span>You currently do not have any research items checked out.</span>
        </Box>
      )}
      <Box
        sx={{
          fontSize: "desktop.body.body2",
          marginTop: "m",
          marginBottom: "m",
          display: "flex",
          justifyContent: "flex-start",
          gap: "4px",
        }}
      >
        <Icon size="medium" name="errorOutline" iconRotation="rotate180" />{" "}
        <span>
          See <Link href="https://nypl.na2.iiivega.com/">this page</Link> for
          eBooks and eAudiobooks checked out by you
        </span>
      </Box>
      <Table
        sx={{
          "thead > tr > th, thead > tr > th:last-of-type": {
            textTransform: "unset",
            fontWeight: "700",
            borderColor: "ui.gray.light-cool",
          },
          "tbody > tr > td, tbody > tr > td:last-of-type": {
            borderColor: "ui.gray.light-cool",
          },
        }}
        showRowDividers={true}
        columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
        columnHeaders={checkoutsHeaders}
        tableData={checkoutsData}
      />
    </>
  )
}

export default CheckoutsTab
