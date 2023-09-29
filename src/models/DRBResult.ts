import type {
  DRBWork,
  Edition,
  Author,
  Agent,
  EditionLink,
} from "../types/drbTypes"
import { readOnlineMediaTypes } from "../utils/drbUtils"

/**
 * The DRBResult class contains the data and getter functions
 * for a single DRB search result entity.
 *
 * DRB Results returned from the API are mapped and initialized into
 * DRBResult objects in the DRBContainer component.
 */
export default class DRBResult {
  id: string
  title: string
  editions?: Edition[]
  authors?: Author[] | Agent[]

  constructor(work: DRBWork) {
    this.id = work.uuid
    this.title = work.title
    this.editions = work.editions
    this.authors = this.getAuthorsFromWork(work)
  }

  get selectedEdition(): Edition {
    return (
      this.editions.find(
        (edition) => edition?.items?.length && edition.items[0].links.length
      ) || this.editions[0]
    )
  }

  get selectedLink(): EditionLink | null {
    const { items } = this.selectedEdition
    if (!items) return null
    let selectedLink: EditionLink
    const selectedItem = items.find((item) =>
      item.links.find((link) => {
        selectedLink = link
        // See above for media types that are used for "Read Online" links
        return readOnlineMediaTypes.indexOf(link.mediaType) > -1
      })
    )

    if (!selectedItem || !selectedLink || !selectedLink.url) return null
    return selectedLink
  }

  getAuthorsFromWork(work: DRBWork): Author[] | Agent[] {
    return work.authors
      ? work.authors
      : work.agents.filter((agent) => agent.roles.includes("author"))
  }
}
