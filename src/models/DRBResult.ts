import type { DRBWork } from "../types/drbTypes"

/**
 * The DRBResult class contains the data and getter functions
 * for a single DRB search result entity.
 *
 * DRB Results returned from the API are mapped and initialized into
 * DRBResult objects in the DRBContainer component.
 */
export default class DRBResult {
  id: string

  constructor(work: DRBWork) {
    this.id = work.uuid
  }
}
