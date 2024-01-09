export const displayRtl = (value: string) => {
  return isRtl(value) ? "rtl" : "ltr"
}

const isRtl = (value: string) => value.substring(0, 1) === "\u200F"

export const isItTheLastElement = (i, array) => !(i < array.length - 1)
