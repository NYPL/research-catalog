import AuthorityVarfield, { type VarField } from "./AuthorityVarfield"

class FiveHundredVarfield extends AuthorityVarfield {
  constructor(varfield: VarField) {
    super(varfield)
    this.label = this.getLabel({ skipTag: "w" })
    this.url = `/browse?q=${this.label.split(" -- ")[0]}`
  }
}

export default FiveHundredVarfield
