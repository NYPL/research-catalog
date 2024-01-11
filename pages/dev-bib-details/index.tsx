import {
  bibWithSupplementaryContent,
  noParallels,
  parallelsBib,
  yiddishBib,
} from "../../__test__/fixtures/bibFixtures"
import BibDetails from "../../src/components/BibPage/BibDetail"
import Layout from "../../src/components/Layout/Layout"
import BibDetailsModel from "../../src/models/BibDetails"

const BibPage = () => {
  const bibModel = new BibDetailsModel(noParallels)
  const { topDetails, bottomDetails, holdingsDetails } = bibModel

  return (
    <Layout>
      {[topDetails, bottomDetails, holdingsDetails]
        .filter((d) => d.length)
        .map((details, i) => (
          <BibDetails key={i} details={details} />
        ))}
    </Layout>
  )
}

export default BibPage
