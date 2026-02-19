import {
  browseSubjectSortOptions,
  getBrowseQuery,
  getBrowseIndexHeading,
  getSubjectSearchURL,
  mapQueryToBrowseParams,
  buildLockedBrowseQuery,
  browseContributorSortOptions,
  getBrowseFormKey,
  isPreferredTerm,
  buildTermLinks,
} from "../browseUtils"

describe("browseUtils", () => {
  describe("getSubjectSearchURL()", () => {
    it("should encode the subject term into a valid URL", () => {
      expect(getSubjectSearchURL("Science")).toBe("/browse/subjects/Science")
      expect(getSubjectSearchURL("Social Science")).toBe(
        "/browse/subjects/Social%20Science"
      )
      expect(
        getSubjectSearchURL(
          "X, Malcolm, 1925-1965 -- Political and social views."
        )
      ).toBe(
        "/browse/subjects/X%2C%20Malcolm%2C%201925-1965%20--%20Political%20and%20social%20views%2E"
      )
    })
  })

  describe("mapQueryToBrowseParams", () => {
    it("uses defaults if no values passed", () => {
      expect(mapQueryToBrowseParams({})).toEqual({
        q: "",
        page: 1,
        searchScope: "has",
        sortBy: "count",
        order: "desc",
      })
    })

    it("parses page as number", () => {
      expect(
        mapQueryToBrowseParams({
          page: "3",
        })
      ).toHaveProperty("page", 3)
    })

    it("falls back invalid sort and order", () => {
      const result = mapQueryToBrowseParams({
        //@ts-ignore
        sort: "invalidSort",
        //@ts-ignore
        sort_direction: "invalidOrder",
      })
      expect(result.sortBy).toBe("count")
      expect(result.order).toBe("desc")
    })

    it("accepts valid sort and order", () => {
      const result = mapQueryToBrowseParams({
        sort: "count",
        sort_direction: "desc",
        search_scope: "starts_with",
      })
      expect(result.sortBy).toBe("count")
      expect(result.order).toBe("desc")
      expect(result.searchScope).toBe("starts_with")
    })
  })

  describe("getBrowseQuery", () => {
    it("returns correct query string with defaults not included", () => {
      const params = {
        q: "cats",
        page: 1,
        searchScope: "has",
      }
      expect(getBrowseQuery(params)).toBe(
        "?q=cats&search_scope=has&sort=count&sort_direction=desc"
      )
    })

    it("includes sort params if not default", () => {
      const params = {
        q: "dogs",
        page: 2,
        searchScope: "has",
        sortBy: "count",
        order: "asc",
      }
      expect(getBrowseQuery(params)).toBe(
        "?q=dogs&search_scope=has&sort=count&sort_direction=asc&page=2"
      )
    })

    it("encodes query correctly", () => {
      const params = {
        q: "cats & dogs",
        page: 1,
        searchScope: "starts_with",
        sortBy: "termLabel",
        order: "asc",
      }
      expect(getBrowseQuery(params)).toBe(
        "?q=cats%20%26%20dogs&search_scope=starts_with&sort=termLabel&sort_direction=asc"
      )
    })

    it("applies default sort if missing", () => {
      const params = {
        q: "fish",
        page: 1,
        searchScope: "has",
        sortBy: "",
        order: "",
      }
      expect(getBrowseQuery(params)).toBe(
        "?q=fish&search_scope=has&sort=count&sort_direction=desc"
      )
    })
  })

  describe("isPreferredTerm", () => {
    it("returns true if object has @type preferredTerm", () => {
      const subj = { "@type": "preferredTerm", termLabel: "foo", count: 3 }
      expect(isPreferredTerm(subj)).toBe(true)
    })

    it("returns false if object has @type variant", () => {
      const subj = { "@type": "variant", termLabel: "foo" }
      expect(isPreferredTerm(subj)).toBe(false)
    })
  })

  describe("getBrowseIndexHeading", () => {
    it("returns correct heading with totalResults less than BROWSE_RESULTS_PER_PAGE", () => {
      const params = { q: "cats", page: 1, searchScope: "has" }
      const heading = getBrowseIndexHeading("subjects", params, 20)
      expect(heading).toContain("20")
      expect(heading).toContain('containing "cats"')
    })

    it("returns correct heading with totalResults more than BROWSE_RESULTS_PER_PAGE", () => {
      const params = { q: "dogs", page: 2, searchScope: "starts_with" }
      const heading = getBrowseIndexHeading("subjects", params, 200)
      expect(heading).toContain("26-50")
      expect(heading).toContain('beginning with "dogs"')
    })

    it("adds 'over' for 10000 totalResults", () => {
      const params = { q: "", page: 1, searchScope: "has" }
      const heading = getBrowseIndexHeading("subjects", params, 10000)
      expect(heading).toContain("over")
    })

    it("returns correct heading for authors/contributors", () => {
      const params = { q: "", page: 1, searchScope: "has" }
      const heading = getBrowseIndexHeading("contributors", params, 10000)
      expect(heading).toContain("Authors/Contributors")
    })
  })

  describe("browseSortOptions: subject and contributor", () => {
    it("has expected keys and labels for subject sorts", () => {
      expect(browseSubjectSortOptions).toHaveProperty("termLabel_asc")
      expect(browseSubjectSortOptions.termLabel_asc).toBe(
        "Subject Heading (A - Z)"
      )
      expect(browseSubjectSortOptions.count_desc).toBe("Count (High - Low)")
    })
    it("has expected keys and labels for contributor sorts", () => {
      expect(browseContributorSortOptions).toHaveProperty("termLabel_asc")
      expect(browseContributorSortOptions.termLabel_asc).toBe(
        "Ascending (A - Z)"
      )
      expect(browseContributorSortOptions.count_desc).toBe("Count (High - Low)")
    })
  })

  describe("buildTermLinks", () => {
    it("builds links with termLabel, url, and count", () => {
      const terms = [
        { termLabel: "foo", count: 123 },
        { termLabel: "bar", count: 0 },
        { termLabel: "baz" },
      ]
      const results = buildTermLinks("subjects", terms)
      expect(results).toHaveLength(3)
      expect(results[0]).toMatchObject({
        termLabel: "foo",
        count: "123",
      })
      expect(results[0].url).toContain("/browse?q=foo&search_scope=starts_with")

      expect(results[2].count).toBe("")
    })
  })

  describe("getBrowseFormKey", () => {
    it("returns expected key", () => {
      const result = getBrowseFormKey("contributors", "has")
      expect(result).toBe("contributor_has")
    })
    it("returns default browse option", () => {
      // @ts-ignore
      const result = getBrowseFormKey("xxxx", "xxxxx")
      expect(result).toBe("subject_has")
    })
  })

  describe("buildLockedBrowseQuery", () => {
    it("puts slug first and rebuilds filter params", () => {
      const query = {
        "filters[subjectLiteral][0]": "History",
        "filters[subjectLiteral][1]": "Science",
        page: "2",
      }

      const result = buildLockedBrowseQuery({
        slug: "Math",
        query,
        field: "subjectLiteral",
      })

      expect(result).toMatchObject({
        "filters[subjectLiteral][0]": "Math",
        "filters[subjectLiteral][1]": "History",
        "filters[subjectLiteral][2]": "Science",
        page: "2",
      })
    })

    it("defaults page to 1 when missing", () => {
      const result = buildLockedBrowseQuery({
        slug: "Art",
        query: {},
        field: "subjectLiteral",
      })
      expect(result.page).toBe("1")
    })
  })
})
