import type {
  DRBWork,
  Edition,
  Author,
  Agent,
  EditionLink,
} from "../types/drbTypes"
import { SOURCE_PARAM, DRB_BASE_URL } from "../config/constants"
import { readOnlineMediaTypes, downloadMediaTypes } from "../utils/drbUtils"
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
    this.editions = work.editions || []
    this.authors = this.getAuthorsFromWork(work)
  }

  get url(): string {
    return `${DRB_BASE_URL}/work/${this.id}${SOURCE_PARAM}`
  }

  get selectedEdition(): Edition {
    return (
      this.editions.find(
        (edition) => edition?.items?.length && edition.items[0].links.length
      ) || this.editions[0]
    )
  }

  get readOnlineUrl(): string | null {
    if (!this.selectedEdition?.items) return null

    // Populate selected link with first item on the selected edition that includes
    // a link with a media type included in the readOnlineMediaTypes array.
    let selectedLink: EditionLink
    this.selectedEdition?.items?.find(
      (item) =>
        (selectedLink = item.links.find(
          (link) => readOnlineMediaTypes.indexOf(link.mediaType) > -1
        ))
    )

    // Return null if no selected link is found. Otherwise, return the URL
    return !selectedLink?.link_id
      ? null
      : `${DRB_BASE_URL}/read/${selectedLink.link_id}`
  }

  get downloadLink(): EditionLink | null {
    if (!this.selectedEdition?.items) return null

    // Populate download link with first item on the selected edition that includes
    // a link with a media type included in the downloadMediaTypes array.
    let downloadLink: EditionLink
    this.selectedEdition?.items?.find(
      (item) =>
        (downloadLink = item?.links?.find(
          (link) => downloadMediaTypes.indexOf(link.mediaType) > -1
        ))
    )

    const formattedDownloadLink =
      downloadLink && this.formatDownloadLink(downloadLink)

    return !formattedDownloadLink?.download || !formattedDownloadLink?.url
      ? null
      : formattedDownloadLink
  }

  // Formats the download link media type and url for rendering
  formatDownloadLink(downloadLink: EditionLink) {
    const formattedDownloadLink: EditionLink = downloadLink

    // Format media type to show label in all uppercase (e.g. EPUB)
    formattedDownloadLink.mediaType = downloadLink.mediaType
      .replace(/(application|text)\/|\+zip/gi, "")
      .toUpperCase()

    // Add https if not present in download link and add source="catalog" query param
    formattedDownloadLink.url = downloadLink.url.startsWith("http")
      ? `${downloadLink.url}${SOURCE_PARAM}`
      : `https://${downloadLink.url}/${SOURCE_PARAM}`

    return formattedDownloadLink
  }

  getAuthorsFromWork(work: DRBWork): Author[] | Agent[] {
    return work.authors
      ? work.authors
      : work.agents?.filter((agent) => agent.roles.includes("author"))
  }
}
