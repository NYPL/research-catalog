import {
  encodeHTML,
  getPaginationOffsetStrings,
  convertToSentenceCase,
  tryInstantiate,
  handleTableCopy,
} from "../appUtils"

const makeEvent = () => ({
  clipboardData: { setData: jest.fn() },
  preventDefault: jest.fn(),
})

const mockSelection = (text: string) =>
  jest.spyOn(window, "getSelection").mockReturnValue({
    toString: () => text,
  } as Selection)

describe("appUtils", () => {
  describe("encodeHTML", () => {
    it("should correctly encode a string to html", () => {
      expect(encodeHTML('"Test" & string to < encode')).toBe(
        "&quot;Test&quot; &amp; string to &lt; encode"
      )
    })
  })
  describe("getPaginationOffsetStrings", () => {
    it("returns a tuple of strings with the correct start and end values for the first page", () => {
      const [start, end] = getPaginationOffsetStrings(1, 1200, 50)
      expect(start).toEqual("1")
      expect(end).toEqual("50")
    })
    it("returns a tuple of strings with the correct start and end values for any given page", () => {
      const [start, end] = getPaginationOffsetStrings(5, 1200, 50)
      expect(start).toEqual("201")
      expect(end).toEqual("250")
    })
    it("correctly sets the end value for the last page", () => {
      const [start, end] = getPaginationOffsetStrings(24, 1195, 50)
      expect(start).toEqual("1,151")
      expect(end).toEqual("1,195")
    })
  })
  describe("convertToSentenceCase", () => {
    it("converts a capitalized string to sentence case", () => {
      expect(convertToSentenceCase("Convert This Sentence.")).toEqual(
        "Convert this sentence."
      )
    })
    it("converts a fully uppercase string to sentence case", () => {
      expect(convertToSentenceCase("CONVERT THIS SENTENCE.")).toEqual(
        "Convert this sentence."
      )
    })
    it("returns the string that is passed in if it's a single word, to avoid sentence-casing acronyms", () => {
      expect(convertToSentenceCase("ISSN")).toEqual("ISSN")
    })
  })
  describe("handleTableCopy", () => {
    afterEach(() => jest.restoreAllMocks())

    it("does nothing when selection has multiple segments with text", () => {
      mockSelection("Call number\n*LZR 72182 [Disc]")
      const e = makeEvent()
      handleTableCopy(e as any, "\n")
      expect(e.clipboardData.setData).not.toHaveBeenCalled()
    })

    it("strips leading newline when only one segment has content", () => {
      mockSelection("\n*LZR 72182 [Disc]")
      const e = makeEvent()
      handleTableCopy(e as any, "\n")
      expect(e.clipboardData.setData).toHaveBeenCalledWith(
        "text/plain",
        "*LZR 72182 [Disc]"
      )
    })

    it("does nothing when selection has only one segment", () => {
      mockSelection("*LZR 72182 [Disc]")
      const e = makeEvent()
      handleTableCopy(e as any, "\n")
      expect(e.clipboardData.setData).not.toHaveBeenCalled()
    })
  })
  class TestClass {
    value: number
    constructor(value: number) {
      this.value = value
    }
  }
  class ErrorClass {
    constructor() {
      throw new Error("Constructor failed")
    }
  }

  describe("tryInstantiate", () => {
    test("creates instance with correct arguments", () => {
      const instance = tryInstantiate({
        constructor: TestClass,
        args: [42],
        ignoreError: false,
        errorMessage: "Should not throw",
      })
      expect(instance).toBeInstanceOf(TestClass)
      expect(instance?.value).toBe(42)
    })

    test("throws error when constructor fails and ignoreError is false", () => {
      expect(() => {
        tryInstantiate({
          constructor: ErrorClass,
          args: [],
          ignoreError: false,
          errorMessage: "Custom error message",
        })
      }).toThrow("Custom error message")
    })

    test("returns null when constructor fails and ignoreError is true", () => {
      const result = tryInstantiate({
        constructor: ErrorClass,
        args: [],
        ignoreError: true,
        errorMessage: "This message is ignored",
      })
      expect(result).toBeNull()
    })
  })
})
