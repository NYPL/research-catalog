type VarField = {
  content: string
  fieldTag: string
  subfields?: { content: string; tag: string }[]
  marcTag: string
}
export type SierraAuthority = {
  id: number
  varFields: VarField[]
}

class AuthorizedHeading {
  sierraHeadingData: SierraAuthority
  label: string
  type: string
  url: string
  fourHundredVariants: any[]
  fiveHundredVariants: any[]
  constructor(sierraHeadingData: SierraAuthority) {
    this.sierraHeadingData = sierraHeadingData
    this.label = this.getLabel()
    this.type = this.getHeadingType()
    this.url = `/search?filters[subjectLiteral][0]=${this.getSubjectLiteral()}`
    this.fourHundredVariants = this.get400Variants()
    this.fiveHundredVariants = this.get500Variants()
  }
  getFieldTagD() {
    const fieldTagD = this.sierraHeadingData.varFields.find(
      (f) => f.fieldTag === "d"
    )
    return fieldTagD
  }
  getSubfieldA() {
    const subfieldA = this.getFieldTagD()?.subfields.find(
      (sf) => sf.tag === "a"
    )
    return subfieldA.content
  }
  getLabel() {
    return this.getFieldTagD()
      .subfields.map((sf) => sf.content)
      .join(" -- ")
  }
  buildSubfieldMap() {
    return this.getFieldTagD().subfields.reduce((subFieldMap, field) => {
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
    const marcTag = this.getFieldTagD().marcTag
    return headings[marcTag]
  }
  get400Variants() {
    return []
  }
  get500Variants() {
    return []
  }
  get300Variants() {
    return []
  }
}

export default AuthorizedHeading

const headings = {
  100: "Personal Name",
  110: "Corporate Name",
  111: "Meeting Name",
  130: "Uniform Title",
  147: "Named Event",
  148: "Chronological Term",
  150: "Topical Term",
  151: "Geographic Name",
  155: "Genre/Form Term",
  162: "Medium of Performance Term",
  180: "General Subdivision",
  181: "Geographic Subdivision",
  182: "Chronological Subdivision",
  185: "Form Subdivision",
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
