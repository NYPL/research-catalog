import AuthorityVarfield, { type VarField } from "./AuthorityVarfield"

export type SierraAuthority = {
  id: number
  varFields: VarField[]
}

class Heading {
  primary: AuthorityVarfield
  fiveHundreds: AuthorityVarfield[]
  constructor(sierraAuthorityRecord: SierraAuthority) {
    this.primary = new AuthorityVarfield(
      this.getFieldTagD(sierraAuthorityRecord)
    )
    this.fiveHundreds = this.getFiveHundreds(sierraAuthorityRecord)
  }
  getFieldTagD(authorityRecord) {
    const fieldTagD = authorityRecord.varFields.find((f) => f.fieldTag === "d")
    return fieldTagD
  }
  getFiveHundreds(sierraAuthorityRecord) {
    const fiveHundreds = sierraAuthorityRecord.varFields.filter(
      (field: VarField) => {
        const tag = parseInt(field.marcTag, 10)
        return tag > 499 && tag < 600
      }
    )
    return fiveHundreds.map(
      (fiveHundredField) => new AuthorityVarfield(fiveHundredField, "5xx")
    )
  }
}

export default Heading
