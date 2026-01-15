import { Fragment } from "react"
import type { Marc } from "../../types/marcTypes"
import { Text } from "@nypl/design-system-react-components"

/**
 * The MarcTable formats and displays MARC fields
 */
const MarcTable = ({ marc }: { marc: Marc }) => {
  const rows: JSX.Element[] = []

  // Leader row
  rows.push(
    <tr key="ldr">
      <td>
        <Text isBold>LDR</Text>
      </td>
      <td /> <td />
      <td>
        <Text isBold>{marc.leader.content}</Text>
      </td>
    </tr>
  )

  // Control fields
  marc.controlFields.forEach((field, i) => {
    rows.push(
      <tr key={`control-field-${field.marcTag}`}>
        <td>
          <Text isBold>{field.marcTag}</Text>
        </td>
        <td /> <td />
        <td>
          <Text>{field.content}</Text>
        </td>
      </tr>
    )
  })

  // Build formatted subfield content
  const subfieldContent = (field) => {
    return field.subfields?.map((sf, idx) => (
      <Fragment key={idx}>
        <span>
          <Text as="span" fontWeight="bold" color="brand.primary">
            {sf.tag}
          </Text>
          <Text as="span"> {sf.content}</Text>
        </span>
        {idx < field.subfields.length - 1 && "  "}
      </Fragment>
    ))
  }

  // Data fields
  marc.dataFields.forEach((field, i) => {
    rows.push(
      <tr key={`data-field-${field.marcTag}-${i}`}>
        <td>
          <Text isBold>{field.marcTag}</Text>
        </td>
        <td>
          <Text isBold>{field.ind1}</Text>
        </td>
        <td>
          <Text isBold>{field.ind2}</Text>
        </td>
        <td>
          <Text style={{ whiteSpace: "pre-wrap" }}>
            {subfieldContent(field)}
          </Text>
        </td>
      </tr>
    )
  })

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "32px",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: "48px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ minWidth: "624px" }} />
        </colgroup>
        <thead
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
          }}
        >
          <tr>
            <th>MARC field tag</th>
            <th>Indicator 1</th>
            <th>Indicator 2</th>
            <th>Subfield content</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.key as string}
              style={{
                paddingTop: "4px",
                paddingBottom: "4px",
                height: "40px",
                borderTop: "1px solid var(--nypl-colors-ui-bg-hover)",
                borderBottom: "1px solid var(--nypl-colors-ui-bg-hover)",
                backgroundColor:
                  index % 2 === 0
                    ? "var(--nypl-colors-ui-bg-default)"
                    : "#ffffff",
              }}
            >
              {row.props.children}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MarcTable
