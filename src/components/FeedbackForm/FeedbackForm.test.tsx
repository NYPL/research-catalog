import React from "react"
import userEvent from "@testing-library/user-event"

import { render, screen } from "../../utils/testUtils"
import FeedbackForm from "./FeedbackForm"

describe("FeedbackForm", () => {
  it("renders a feedback button, expands the form on click, and closes it on cancel button click", async () => {
    render(<FeedbackForm></FeedbackForm>)

    const feedbackButton = screen.getByText("Help and Feedback")
    expect(feedbackButton).toBeInTheDocument()
    await userEvent.click(feedbackButton)

    const titleText = screen.getByText("We are here to help!")
    expect(titleText).toBeInTheDocument()
    expect(screen.getByLabelText("Comment (Required)")).toBeInTheDocument()
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
