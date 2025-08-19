import { getBrowseQuery } from "../../utils/browseUtils"
import { BROWSE_FORM_OPTIONS, PATHS } from "../../config/constants"
import { idConstants } from "../../context/FocusContext"
import SearchBrowseForm from "../SearchBrowseForm/SearchBrowseForm"
import type { RCPage } from "../../types/pageTypes"
import { Button } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

const BrowseForm = ({ activePage }: { activePage: RCPage }) => {
  const { push } = useRouter()
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
      {activePage === "sh-results" && (
        <Button
          buttonType="secondary"
          id="back-index"
          size="medium"
          width="fit-content"
          onClick={() => push(PATHS.BROWSE)}
          gap="xxs"
          background="white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#0069BF"
            />
          </svg>
          Back to index
        </Button>
      )}
    </SearchBrowseForm>
  )
}

export default BrowseForm
