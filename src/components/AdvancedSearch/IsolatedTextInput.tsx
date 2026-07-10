import { FormField, TextInput } from "@nypl/design-system-react-components"
import { useState } from "react"

interface IsolatedTextInputProps {
  name: string
  label: string
  globalInputChangeHandler: () => void
}

/**
 * A component that manages state for the Design System TextInput component,
 * separately from the AdvancedSearch component (for performance improvements
 * over maintaining a global state in AdvancedSearch).
 * Input value is obtained through FormData when Advanced Search page form is
 * submitted.
 */
const IsolatedTextInput = ({
  name,
  label,
  globalInputChangeHandler,
}: IsolatedTextInputProps) => {
  const [value, setValue] = useState("")

  return (
    <FormField>
      <TextInput
        id={name}
        labelText={label}
        name={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          globalInputChangeHandler()
          setValue(e.target.value)
        }}
      />
    </FormField>
  )
}
IsolatedTextInput.displayName = "IsolatedTextInput"

export default IsolatedTextInput
