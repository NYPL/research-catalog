import { FormField, TextInput } from "@nypl/design-system-react-components"
import { memo, useEffect, useState } from "react"

interface TextInputFieldProps {
  name: string
  label: string
  resetKey: number
  globalInputChangeHandler: () => void
}

const TextInputFieldMemo = memo(
  ({
    name,
    label,
    resetKey,
    globalInputChangeHandler,
  }: TextInputFieldProps) => {
    const [value, setValue] = useState("")

    useEffect(() => {
      setValue("")
    }, [resetKey])

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
)
TextInputFieldMemo.displayName = "TextInputFieldMemo"

export default TextInputFieldMemo
