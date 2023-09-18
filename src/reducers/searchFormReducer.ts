import type { SearchFormEvent, SearchFormAction } from "../types/searchTypes"

export const searchFormReducer = (
  formState: SearchFormEvent,
  action: SearchFormAction
) => {
  switch (action.type) {
    case "HANDLE_TEXT_INPUT": {
      return {
        ...formState,
        [action.field]: action.payload,
      }
    }
    default:
      return formState
  }
}
