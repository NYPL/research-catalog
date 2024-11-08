import type { EDDRequestParams, EDDFormAction } from "../types/holdTypes"

export const eddFormReducer = (
  formState: EDDRequestParams,
  action: EDDFormAction
) => {
  switch (action.type) {
    case "input_change": {
      return {
        ...formState,
        [action.field]: action.payload,
      }
    }
    default:
      return formState
  }
}