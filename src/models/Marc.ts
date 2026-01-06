import type {
  ControlField,
  LeaderField,
  MarcField,
} from "../types/bibDetailsTypes"

export default class Marc {
  id: string
  nyplSource: string
  leader: LeaderField
  controlFields: ControlField[]
  dataFields: MarcField[]

  constructor(result?: Marc) {
    this.id = result.id
    this.nyplSource = result.nyplSource
    this.leader = this.buildLeader()
    this.controlFields = this.buildControlFields()
    this.dataFields = this.buildDataFields()
  }

  buildControlFields(): ControlField[] {
    return []
  }

  buildLeader(): LeaderField {
    return { fieldTag: "_", content: "" }
  }

  buildDataFields(): MarcField[] {
    return []
  }
}
