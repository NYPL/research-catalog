import { useState } from "react"
import { Banner } from "@nypl/design-system-react-components"

interface ParsedQueryProps {
  parsed: any
}

const formatParsed = (node: any): string => {
  if (Array.isArray(node)) {
    return node
      .map((item) => (Array.isArray(item) ? `(${formatParsed(item)})` : item))
      .join(" ")
  }
  return String(node)
}

const ParsedQuery = ({ parsed }: ParsedQueryProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Banner
      mb="m"
      variant="informative"
      heading="Parsed CQL query"
      content={
        <div>
          <div
            onClick={() => setExpanded(!expanded)}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              userSelect: "none",
              gap: 8,
            }}
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.2s ease",
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ▶
            </span>
            <span>{formatParsed(parsed)}</span>
          </div>

          {expanded && (
            <pre
              style={{
                marginTop: 12,
                marginBottom: 0,
                padding: 12,
                borderRadius: 4,
                fontSize: 12,
                overflowX: "auto",
              }}
            >
              {JSON.stringify(parsed, null, 2)}
            </pre>
          )}
        </div>
      }
    />
  )
}

export default ParsedQuery
