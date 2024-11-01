import type {
  EDDRequestRequiredParams,
  EDDRequestFormAction,
} from "../types/holdTypes"

export const searchFormReducer = (
  formState: EDDRequestRequiredParams,
  action: EDDRequestFormAction
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
