import {
  Button,
  Icon,
  TextInput,
  Text,
} from "@nypl/design-system-react-components"

const NoJsEmailForm = ({ patronData }) => {
  const tempEmails = patronData?.emails || []
  return (
    <>
      <form
        action={`/research/research-catalog/api/account/settings/${patronData.id}`}
        method="POST"
        style={{ width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <h3
              style={{
                display: "flex",
                fontWeight: "500",
                flexDirection: "row",
                width: "256px",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Icon name="communicationEmail" size="medium" /> Email
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "24px",
              paddingRight: "8px",
              gap: "8px",
            }}
          >
            {tempEmails.map((email, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <TextInput
                  type="email"
                  name={"emails"}
                  defaultValue={email}
                  required
                  id={`email-${index}`}
                  showLabel={false}
                  showHelperInvalidText={false}
                  labelText={"Email"}
                  sx={{ width: "300px" }}
                />
                {index === 0 && <span style={{ color: "gray" }}>(P)</span>}
                {index > 0 && (
                  <button type="submit" name="delete" value={index}>
                    <Icon
                      name="actionDelete"
                      size="large"
                      color="ui.link.primary"
                    />
                  </button>
                )}
              </div>
            ))}
            <Text size="caption" sx={{ marginBottom: 0 }}>
              Add an email address:
            </Text>
            <TextInput
              type="email"
              name="emails"
              defaultValue=""
              id={"email-new"}
              showLabel={false}
              showHelperInvalidText={false}
              labelText="Add new email"
              sx={{ width: "300px" }}
            />
          </div>
          <div style={{ justifySelf: "flex-end", marginLeft: "auto" }}>
            <Button type="submit" id={"submit-emails"}>
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default NoJsEmailForm
