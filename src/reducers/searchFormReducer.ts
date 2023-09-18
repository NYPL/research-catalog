import type { SearchQueryParams, SearchFormAction } from "../types/searchTypes"

export const searchFormReducer = (
  formState: SearchQueryParams,
  action: SearchFormAction
) => {
  switch (action.type) {
    case "text_input": {
      return {
        ...formState,
        [action.field]: action.payload,
      }
    }
    case "form_reset": {
      return action.payload
    }
    default:
      return formState
  }
}
