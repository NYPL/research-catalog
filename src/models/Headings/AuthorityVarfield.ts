import { headings } from "../../../pages/browse/sierraUtils"

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
  constructor(varField: VarField, varfieldType: "4xx" | "5xx" | "6xx") {
    this.varField = varField
    const skipTags = {
      "5xx": "w",
    }
    this.label = this.getLabel(skipTags[varfieldType])
    this.type = this.getHeadingType()
    this.url = `/search?filters[subjectLiteral][0]=${this.getSubjectLiteral()}`
  }
  getSubfield(varfield: VarField, tag) {
    const subfield = varfield.subfields.find((sf) => sf.tag === tag)
    return subfield.content
  }
  getLabel(skipTag: string) {
    return this.varField.subfields
      .filter(({ tag }) => tag !== skipTag)
      .map(({ content }) => content)
      .join(" -- ")
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
    return headings[digits]
  }
}

export default AuthorityVarfield

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
