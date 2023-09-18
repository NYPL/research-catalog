import type { SearchQueryParams, SearchFormAction } from "../types/searchTypes"

export const searchFormReducer = (
  formState: SearchQueryParams,
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
