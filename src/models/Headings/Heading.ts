import AuthorityVarfield, { type VarField } from "./AuthorityVarfield"
import VariantVarfield from "./VariantVarfield"

export type SierraAuthority = {
  id: number
  varFields: VarField[]
  count: number
}

class Heading {
  primary: AuthorityVarfield
  seeAlso: VariantVarfield[]
  fourHundreds: VariantVarfield[]
  broaderTerms: VariantVarfield[]
  count: number
  sierraAuthorityData: SierraAuthority
  constructor(sierraAuthorityData: SierraAuthority) {
    this.sierraAuthorityData = sierraAuthorityData
    this.count = sierraAuthorityData.count
    this.primary = new AuthorityVarfield(this.getFieldTagD(sierraAuthorityData))
    this.seeAlso = this.getFiveHundreds().filter(
      ({ broaderTerm }) => !broaderTerm
    )
    this.broaderTerms = this.getFiveHundreds().filter(
      ({ broaderTerm }) => broaderTerm
    )
    this.fourHundreds = this.getFourHundreds()
  }
  getFieldTagD(authorityRecord) {
    const fieldTagD = authorityRecord.varFields.find((f) => f.fieldTag === "d")
    return fieldTagD
  }
  getXXFields(number: 400 | 500 | 600) {
    const min = number - 1
    const max = number + 100
    const xxFields = this.sierraAuthorityData.varFields.filter(
      (field: VarField) => {
        const tag = parseInt(field.marcTag, 10)
        return tag > min && tag < max
      }
    )
    return xxFields
  }
  getFiveHundreds() {
    return this.getXXFields(500).map((field) => new VariantVarfield(field))
  }
  getFourHundreds() {
    return this.getXXFields(400).map((field) => new VariantVarfield(field))
  }
}

export default Heading
