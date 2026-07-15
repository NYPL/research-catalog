import { FormField, TextInput } from "@nypl/design-system-react-components"
import { useState } from "react"

interface IsolatedTextInputProps {
  name: string
  label: string
  onChange: (name: string, value: string) => void
}

/**
 * A component that manages local state for the Design System TextInput component
 * (reduces unnecessary rerenders compared to using a global React state in
 * Advanced Search page).
 * Updates formStateRef in the Advanced Search page on change.
 */
const IsolatedTextInput = ({
  name,
  label,
  onChange,
}: IsolatedTextInputProps) => {
  const [value, setValue] = useState("")

  return (
    <TextInput
      id={name}
      labelText={label}
      name={name}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.value)
        setValue(e.target.value)
      }}
    />
  )
}
IsolatedTextInput.displayName = "IsolatedTextInput"

export default IsolatedTextInput
