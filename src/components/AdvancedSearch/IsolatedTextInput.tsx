import { FormField, TextInput } from "@nypl/design-system-react-components"
import { useState } from "react"

interface IsolatedTextInputProps {
  name: string
  label: string
  globalInputChangeHandler: () => void
}

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
