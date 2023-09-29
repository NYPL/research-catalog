import type {
  DRBWork,
  Edition,
  Author,
  Agent,
  EditionLink,
} from "../types/drbTypes"
import { readOnlineMediaTypes } from "../utils/drbUtils"
import { appConfig } from "../config/config"

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

  // TODO: Check to see if selectedItem is necessary
  get readOnlineLink(): EditionLink | null {
    const { items } = this.selectedEdition
    if (!items) return null
    let selectedLink: EditionLink
    const selectedItem = items.find((item) =>
      item.links.find((link) => {
        selectedLink = link
        return readOnlineMediaTypes.indexOf(link.mediaType) > -1
      })
    )

    return !selectedItem || !selectedLink || !selectedLink.link_id
      ? null
      : selectedLink
  }

  getAuthorsFromWork(work: DRBWork): Author[] | Agent[] {
    return work.authors
      ? work.authors
      : work.agents.filter((agent) => agent.roles.includes("author"))
  }
}
