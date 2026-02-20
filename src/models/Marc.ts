import type {
  ControlField,
  DiscoveryMarcResult,
  LeaderField,
  MarcField,
} from "../types/marcTypes"

export function isLeader(field): field is LeaderField {
  return (
    field.fieldTag === "_" &&
    field.marcTag === null &&
    typeof field.content === "string"
  )
}

export function isControlField(field): field is ControlField {
  return (
    typeof field.marcTag === "string" &&
    /^[0][0-9][0-9]$/.test(field.marcTag) &&
    (!field.subfields || field.subfields.length === 0)
  )
}

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
      .filter((field): field is ControlField => isControlField(field))
      .sort((a, b) => a.marcTag.localeCompare(b.marcTag))
      .map((field) => ({
        marcTag: field.marcTag,
        content: field.content,
      }))
  }

  buildLeader(fields): LeaderField {
    const leaderField = fields.find((field) => isLeader(field))
    return {
      content: leaderField?.content || "",
    }
  }

  buildDataFields(fields): MarcField[] {
    return fields
      .filter(
        (field): field is MarcField =>
          !isLeader(field) && !isControlField(field)
      )
      .sort((a, b) => a.marcTag.localeCompare(b.marcTag))
      .map((field) => ({
        ...field,
        // replace blank indicators with underscores
        ind1: field.ind1 === " " || field.ind1 === "" ? "_" : field.ind1,
        ind2: field.ind2 === " " || field.ind2 === "" ? "_" : field.ind2,

        // prefix tags with |
        subfields: field.subfields?.map((subfield) => ({
          ...subfield,
          tag: `|${subfield.tag}`,
        })),
      }))
  }
}
