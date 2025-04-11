import AuthorityVarfield, { type VarField } from "./AuthorityVarfield"

class VariantVarfield extends AuthorityVarfield {
  variantDesription?: string
  constructor(varfield: VarField) {
    super(varfield)
    this.label = this.getLabel({ skipTag: "w" })
    this.url = `/browse?q=${this.label.split(" -- ")[0]}`
    this.display = this.shouldDisplay()
    // this.variantDescription = this.buildVariantDescription
  }
  shouldDisplay() {
    const subfieldW = this.getSubfieldContent("w")
    return ["a", "b", "c", "d"].includes(subfieldW?.[3])
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
