import { getBrowseQuery } from "../../utils/browseUtils"
import { BROWSE_FORM_OPTIONS, PATHS } from "../../config/constants"
import { idConstants } from "../../context/FocusContext"
import SearchBrowseForm from "../SearchBrowseForm/SearchBrowseForm"
import type { RCPage } from "../../types/pageTypes"

const BrowseForm = ({ activePage }: { activePage: RCPage }) => {
  return (
    <SearchBrowseForm
      initialScope="has"
      path={PATHS.BROWSE}
      tipTitle="Browse tip: "
      selectOptions={BROWSE_FORM_OPTIONS}
      scopeParamKey="searchScope"
      getQueryString={getBrowseQuery}
      onSubmitFocusId={idConstants.browseResultsHeading}
      activePage={activePage}
    />
  )
}

export default BrowseForm
