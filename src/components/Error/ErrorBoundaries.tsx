import { Component, type ReactNode } from "react"
import Image from "next/image"
import ErrorPage from "../../../pages/_error"
import errorImage from "../../assets/errorImage.png"

// for render errors in the page tree
export class PageErrorBoundary extends Component<
  { children: ReactNode; isAuthenticated?: boolean; resetKey?: string },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  // Clear a caught error on route change
  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false })
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          activePage="error"
          statusCode={500}
          isAuthenticated={this.props.isAuthenticated}
        />
      )
    }
    return this.props.children
  }
}

// last-resort pure HTML fallback if ErrorPage itself throws while rendering inside PageErrorBoundary
export class ErrorBoundary extends Component<
  { children: ReactNode; resetKey?: string },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false })
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "96px 24px",
            fontFamily: "system-ui, sans-serif",
            color: "#1b1b1b",
          }}
        >
          <Image
            src={errorImage}
            alt=""
            width={98}
            height={68}
            style={{ marginBottom: "48px" }}
          />
          <h2
            style={{ fontSize: "2rem", fontWeight: 500, marginBottom: "8px" }}
          >
            Something went wrong on our end
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.5,
              maxWidth: "480px",
              margin: "0 auto 4px",
            }}
          >
            We encountered an error while trying to load the page.
          </p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.5,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Try{" "}
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                textDecorationThickness: "1px",
                font: "inherit",
                padding: 0,
                color: "inherit",
              }}
            >
              reloading the page
            </button>{" "}
            or{" "}
            <a
              href="https://www.nypl.org/get-help/contact-us"
              style={{
                color: "inherit",
                textUnderlineOffset: "2px",
                textDecorationThickness: "1px",
              }}
            >
              contact us
            </a>{" "}
            if the error persists.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
