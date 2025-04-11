export type VarField = {
  content: string
  fieldTag: string
  subfields?: { content: string; tag: string }[]
  marcTag: string
}

class AuthorityVarfield {
  varField: VarField
  label: string
  type: string
  url: string
  constructor(varField: VarField) {
    this.varField = varField
    this.label = this.getLabel()
    this.type = this.getHeadingType()
    this.url = `/search?filters[subjectLiteral][0]=${this.getSubjectLiteral()}`
  }
  getSubfield(varfield: VarField, tag) {
    const subfield = varfield.subfields.find((sf) => sf.tag === tag)
    return subfield.content
  }
  getLabel() {
    return this.varField.subfields.map((sf) => sf.content).join(" -- ")
  }
  buildSubfieldMap() {
    return this.varField.subfields.reduce((subFieldMap, field) => {
      subFieldMap[field.tag] = field.content
      return subFieldMap
    }, {})
  }
  getSubjectLiteral() {
    return (
      [
        valuesByKeys(this.buildSubfieldMap(), [
          "a",
          "b",
          "c",
          "d",
          "e",
          "g",
          "4",
        ])
          .map((v) => (Array.isArray(v) ? v.join(" ") : v))
          .join(" "),
        valuesByKeys(this.buildSubfieldMap(), ["v", "x", "y", "z"])
          .map((v) => (Array.isArray(v) ? v.join(" -- ") : v))
          .join(" -- "),
      ]
        // If either set of values matched nothing, drop it:
        .filter((v) => v)
        // Join sets together with ' -- ':
        .join(" -- ")
    )
  }
  getHeadingType() {
    const marcTag = this.varField.marcTag
    const digits = parseInt(marcTag, 10) % 100
    console.log(digits)
    return headings[digits]
  }
}

export default AuthorityVarfield

const headings = {
  0: "Personal Name",
  10: "Corporate Name",
  11: "Meeting Name",
  30: "Uniform Title",
  47: "Named Event",
  48: "Chronological Term",
  50: "Topical Term",
  51: "Geographic Name",
  55: "Genre/Form Term",
  62: "Medium of Performance Term",
  80: "General Subdivision",
  81: "Geographic Subdivision",
  82: "Chronological Subdivision",
  85: "Form Subdivision",
}

/**
 *  Generally usable formatting utils
 */

/**
 *  Given a hash, returns a new hash containing key-value pairs that meet:
 *   1) key must be in given `keys`
 *   2) value must by truthy
 */
const hashByKeys = (hash, keys) => {
  return Object.keys(hash).reduce((newHash, key) => {
    const value = hash[key]
    // If the keys requested include this key
    // .. and extracted value is truthy
    // .. include it in new hash.
    if (keys.indexOf(key) >= 0 && value) newHash[key] = value
    return newHash
  }, {})
}

/**
 * Get array of truthy values from hash matching given keys (but only if the
 * values are truthy)
 *
 * @example
 * valuesByKeys ({ key1: 'value1', key2: 'value2', key3: null }, ['key2'])
 *   => ['value2']
 */
const valuesByKeys = (hash, keys) => {
  hash = hashByKeys(hash, keys)
  return Object.keys(hash).map((key) => hash[key])
}
