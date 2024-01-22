import {
  bibWithSupplementaryContent,
  // noParallels,
  // parallelsBib,
  // yiddishBib,
} from "../../__test__/fixtures/bibFixtures"
import BibDetails from "../../src/components/BibPage/BibDetail"
import Layout from "../../src/components/Layout/Layout"
import BibDetailsModel from "../../src/models/BibDetails"

const BibPage = () => {
  const bibModel = new BibDetailsModel(
    bibWithSupplementaryContent.resource,
    bibWithSupplementaryContent.annotatedMarc
  )
  const { topDetails, bottomDetails, holdingsDetails } = bibModel

  return (
    <Layout>
      <BibDetails key="top-details" details={topDetails} />
      <BibDetails
        heading="Details"
        key="bottom-details"
        details={bottomDetails}
      />
      <BibDetails
        heading="Holdings"
        key="holdings-details"
        details={holdingsDetails}
      />
    </Layout>
  )
}

export default BibPage
