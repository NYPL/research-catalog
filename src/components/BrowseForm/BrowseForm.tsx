import {
  browseFormSelectOptions,
  getBrowseQuery,
} from "../../utils/browseUtils"
import { PATHS } from "../../config/constants"
import { idConstants } from "../../context/FocusContext"
import SearchBrowseForm from "../SearchForm/SearchBrowseForm"

const BrowseForm = () => {
  return (
    <SearchBrowseForm
      initialScope="has"
      path={PATHS.BROWSE}
      placeholder="Example: Ornithology or Vietnam War"
      tipTitle="Browse tip: "
      tipText="Enter one or more keywords in any order to browse the Subject Headings index."
      selectOptions={browseFormSelectOptions}
      queryParamKeys={{ searchTerm: "q", searchScope: "search_scope" }}
      getQueryString={getBrowseQuery}
      onSubmitFocusId={idConstants.browseResultsHeading}
    />
  )
}

export default BrowseForm
