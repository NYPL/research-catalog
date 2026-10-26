import { Component, type ReactNode } from "react"
import ErrorPage from "../../../pages/_error"

// for render errors in the page tree
export class PageErrorBoundary extends Component<
  { children: ReactNode; isAuthenticated?: boolean },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          activePage=""
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
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
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
          <div
            aria-hidden="true"
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: "#00838A ",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#FFF",
              marginBottom: "48px",
              flexShrink: 0,
            }}
          >
            !
          </div>
          <h2
            style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "8px" }}
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
                textDecorationThickness: "1.5px",
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
              style={{ color: "inherit" }}
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
