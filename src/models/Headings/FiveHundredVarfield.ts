import AuthorityVarfield, { type VarField } from "./AuthorityVarfield"

class FiveHundredVarfield extends AuthorityVarfield {
  constructor(varfield: VarField) {
    super(varfield)
    this.label = this.getLabel({ skipTag: "w" })
    this.url = `/browse?q=${this.label.split(" -- ")[0]}`
    this.display = this.shouldDisplay()
  }
  shouldDisplay() {
    const subfieldW = this.getSubfield("w")
    return ["a", "b", "c", "d"].includes(subfieldW?.[3])
  }
}

export default FiveHundredVarfield
