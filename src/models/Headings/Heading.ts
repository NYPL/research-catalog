import AuthorityVarfield, { type VarField } from "./AuthorityVarfield"
import VariantVarfield from "./VariantVarfield"

export type SierraAuthority = {
  id: number
  varFields: VarField[]
}

class Heading {
  primary: AuthorityVarfield
  seeAlso: VariantVarfield[]
  fourHundreds: VariantVarfield[]
  broaderTerms: VariantVarfield[]
  constructor(sierraAuthorityRecord: SierraAuthority) {
    this.primary = new AuthorityVarfield(
      this.getFieldTagD(sierraAuthorityRecord)
    )
    this.seeAlso = this.getFiveHundreds(sierraAuthorityRecord).filter(
      ({ broaderTerm }) => !broaderTerm
    )
    this.broaderTerms = this.getFiveHundreds(sierraAuthorityRecord).filter(
      ({ broaderTerm }) => broaderTerm
    )
    this.fourHundreds = this.getFourHundreds(sierraAuthorityRecord)
  }
  getFieldTagD(authorityRecord) {
    const fieldTagD = authorityRecord.varFields.find((f) => f.fieldTag === "d")
    return fieldTagD
  }
  getXXFields(sierraAuthorityRecord, number: 400 | 500 | 600) {
    const min = number - 1
    const max = number + 100
    const xxFields = sierraAuthorityRecord.varFields.filter(
      (field: VarField) => {
        const tag = parseInt(field.marcTag, 10)
        return tag > min && tag < max
      }
    )
    return xxFields
  }
  getFiveHundreds(sierraAuthorityRecord) {
    return this.getXXFields(sierraAuthorityRecord, 500).map(
      (field) => new VariantVarfield(field)
    )
  }
  getFourHundreds(sierraAuthorityRecord) {
    return this.getXXFields(sierraAuthorityRecord, 400).map(
      (field) => new VariantVarfield(field)
    )
  }
}

export default Heading
