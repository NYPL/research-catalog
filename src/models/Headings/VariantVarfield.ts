import AuthorityVarfield, { type VarField } from "./AuthorityVarfield"

class VariantVarfield extends AuthorityVarfield {
  broaderTerm: boolean
  constructor(varfield: VarField) {
    super(varfield)
    this.label = this.getLabel({ skipTags: ["w", "i", "0", "1"] })
    this.url = `/browse?q=${this.label}`
    this.display = this.shouldDisplay()
    this.broaderTerm = this.getBroaderTerm()
  }
  getNarrowTerm() {
    const subfieldW = this.getSubfieldContent("w")?.split("")
    const specialRelationship = subfieldW?.[0]
    if (specialRelationship === "h") return true
    else return false
  }
  getBroaderTerm() {
    const subfieldW = this.getSubfieldContent("w")?.split("")
    const specialRelationship = subfieldW?.[0]
    if (specialRelationship === "g") return true
    else return false
  }
  shouldDisplay() {
    // return true
    const subfieldW = this.getSubfieldContent("w")
    const referenceDisplay = subfieldW?.[3]
    if (!referenceDisplay || referenceDisplay === "n") {
      return true
    } else if (["a", "b", "c", "d"].includes(subfieldW?.[3])) {
      return false
    }
  }
  buildVariantDescription() {
    const subfieldW = this.getSubfieldContent("w")
    if (subfieldW === "r") {
      const subfieldI = this.getSubfieldContent("i")
      return subfieldI + " "
    }
  }
}

export default VariantVarfield
