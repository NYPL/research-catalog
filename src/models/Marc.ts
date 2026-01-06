import type {
  ControlField,
  DiscoveryMarcResult,
  LeaderField,
  MarcField,
} from "../types/bibDetailsTypes"

export default class Marc {
  id: string
  nyplSource: string
  leader: LeaderField
  controlFields: ControlField[]
  dataFields: MarcField[]

  constructor(result?: DiscoveryMarcResult) {
    this.id = result.bib.id
    this.nyplSource = result.bib.nyplSource
    this.leader = this.buildLeader(result.bib.fields)
    this.controlFields = this.buildControlFields(result.bib.fields)
    this.dataFields = this.buildDataFields(result.bib.fields)
  }

  buildControlFields(fields): ControlField[] {
    return fields
      .filter(
        (field): field is ControlField =>
          typeof field.marcTag === "string" &&
          /^[0][0-9][0-9]$/.test(field.marcTag) &&
          (!field.subfields || field.subfields.length === 0) &&
          typeof field.content === "string"
      )
      .sort((a, b) => a.marcTag.localeCompare(b.marcTag))
      .map((field) => ({
        marcTag: field.marcTag,
        content: field.content,
      }))
  }

  buildLeader(fields): LeaderField {
    const leaderField = fields.find(
      (field) =>
        field.fieldTag === "_" &&
        field.marcTag === null &&
        typeof field.content === "string"
    )
    return { fieldTag: "_", content: leaderField.content }
  }

  buildDataFields(fields): MarcField[] {
    return []
  }
}
