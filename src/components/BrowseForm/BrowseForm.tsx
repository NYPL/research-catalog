import { getBrowseQuery } from "../../utils/browseUtils"
import { BROWSE_FORM_OPTIONS, PATHS } from "../../config/constants"
import { idConstants } from "../../context/FocusContext"
import SearchBrowseForm from "../SearchBrowseForm/SearchBrowseForm"

const BrowseForm = () => {
  return (
    <SearchBrowseForm
      initialScope="has"
      path={PATHS.BROWSE}
      tipTitle="Browse tip: "
      selectOptions={BROWSE_FORM_OPTIONS}
      scopeParamKey="searchScope"
      getQueryString={getBrowseQuery}
      onSubmitFocusId={idConstants.browseResultsHeading}
    />
  )
}

export default BrowseForm
