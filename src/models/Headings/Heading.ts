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
  constructor(sierraAuthorityData: SierraAuthority) {
    this.count = sierraAuthorityData.count
    this.primary = new AuthorityVarfield(this.getFieldTagD(sierraAuthorityData))
    this.seeAlso = this.getFiveHundreds(sierraAuthorityData).filter(
      ({ broaderTerm }) => !broaderTerm
    )
    this.broaderTerms = this.getFiveHundreds(sierraAuthorityData).filter(
      ({ broaderTerm }) => broaderTerm
    )
    this.fourHundreds = this.getFourHundreds(sierraAuthorityData)
  }
  getFieldTagD(authorityRecord) {
    const fieldTagD = authorityRecord.varFields.find((f) => f.fieldTag === "d")
    return fieldTagD
  }
  getXXFields(sierraAuthorityData, number: 400 | 500 | 600) {
    const min = number - 1
    const max = number + 100
    const xxFields = sierraAuthorityData.varFields.filter((field: VarField) => {
      const tag = parseInt(field.marcTag, 10)
      return tag > min && tag < max
    })
    return xxFields
  }
  getFiveHundreds(sierraAuthorityData) {
    return this.getXXFields(sierraAuthorityData, 500).map(
      (field) => new VariantVarfield(field)
    )
  }
  getFourHundreds(sierraAuthorityData) {
    return this.getXXFields(sierraAuthorityData, 400).map(
      (field) => new VariantVarfield(field)
    )
  }
}

export default Heading
