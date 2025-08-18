import { getBrowseQuery } from "../../utils/browseUtils"
import { BROWSE_FORM_OPTIONS, PATHS } from "../../config/constants"
import { idConstants } from "../../context/FocusContext"
import SearchBrowseForm from "../SearchBrowseForm/SearchBrowseForm"
import { Box } from "@nypl/design-system-react-components"

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
    >
      <Box height={{ base: "32px", md: 0 }} />
    </SearchBrowseForm>
  )
}

export default BrowseForm
