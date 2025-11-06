import React from "react"
import userEvent from "@testing-library/user-event"

import { render, screen } from "../../utils/testUtils"
import FeedbackForm from "./FeedbackForm"
import { FeedbackContext } from "../../context/FeedbackContext"

describe("rendering FeedbackForm", () => {
  it("renders a feedback button, expands the form on click, and closes it on cancel button click", async () => {
    render(<FeedbackForm></FeedbackForm>)

    const feedbackButton = screen.getByText("Help and Feedback")
    expect(feedbackButton).toBeInTheDocument()
    await userEvent.click(feedbackButton)

    const titleText = screen.getByText("We are here to help!")
    expect(titleText).toBeInTheDocument()
    expect(screen.getByLabelText("Comment (required)")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()

    const cancelButton = screen.getByText("Cancel")
    expect(cancelButton).toBeInTheDocument()
    await userEvent.click(cancelButton)

    expect(titleText).not.toBeInTheDocument()
  })

  it("renders an error message on submission when there is an error", async () => {
    render(<FeedbackForm></FeedbackForm>)

    await userEvent.click(screen.getByText("Help and Feedback"))
    const commentField = screen.getByPlaceholderText(
      "Enter your question or feedback here"
    )
    await userEvent.type(commentField, "Comment")
    const emailField = screen.getByPlaceholderText(
      "Enter your email address here"
    )
    await userEvent.type(emailField, "test@test.com")
    await userEvent.click(screen.getByText("Submit"))
    expect(
      screen.getByText(
        "Oops! Something went wrong. An error occured while processing your feedback."
      )
    ).toBeInTheDocument()
  })
})

describe("FeedbackForm props in context", () => {
  const baseContext = {
    FeedbackBox: (props: any) => {
      return (
        <div>
          <div data-testid="notificationText">{props.notificationText}</div>
        </div>
      )
    },
    isOpen: true,
    onClose: jest.fn(),
    onOpen: jest.fn(),
    itemMetadata: null,
    setItemMetadata: jest.fn(),
    errorStatus: null,
    setErrorStatus: jest.fn(),
    openFeedbackFormWithError: jest.fn(),
  }

  it("renders notification text for error state", () => {
    render(
      <FeedbackContext.Provider value={{ ...baseContext, errorStatus: 404 }}>
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    expect(screen.getByTestId("notificationText")).toHaveTextContent(
      "You are asking for help or information about a page error"
    )
  })

  it("renders notification text from itemMetadata.notificationText", () => {
    render(
      <FeedbackContext.Provider
        value={{
          ...baseContext,
          itemMetadata: { notificationText: "Item metadata notification" },
        }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    expect(screen.getByTestId("notificationText")).toHaveTextContent(
      "Item metadata notification"
    )
  })

  it("renders notification text from itemMetadata.callNumber", () => {
    render(
      <FeedbackContext.Provider
        value={{
          ...baseContext,
          itemMetadata: { callNumber: "QA 1234 .B56" },
        }}
      >
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    expect(screen.getByTestId("notificationText")).toHaveTextContent(
      "You are asking for help or information about QA 1234 .B56 in this record."
    )
  })

  it("renders no notification text when itemMetadata and requestedURL are null", () => {
    render(
      <FeedbackContext.Provider value={baseContext}>
        <FeedbackForm />
      </FeedbackContext.Provider>
    )

    expect(screen.getByTestId("notificationText")).toBeEmptyDOMElement()
  })
})
