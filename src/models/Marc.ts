import type {
  ControlField,
  LeaderField,
  MarcField,
} from "../types/bibDetailsTypes"

export default class Marc {
  id: string
  nyplSource: string
  leader: LeaderField
  controls: ControlField[]
  fields: MarcField[]

  constructor(result?: Marc) {
    this.id = result.id
    this.nyplSource = result.nyplSource
    this.leader = this.buildLeader()
    this.controls = this.buildControlFields()
    this.fields = this.buildVarFields()
  }

  buildControlFields(): ControlField[] {
    return []
  }

  buildLeader(): LeaderField {
    return { fieldTag: "_", content: "" }
  }

  buildVarFields(): MarcField[] {
    return []
  }
}
