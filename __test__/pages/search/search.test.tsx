import { getServerSideProps } from "../../../pages/search/index"
import initializePatronTokenAuth from "../../../src/server/auth"
import { fetchSearchResults } from "../../../src/server/api/search"
import { mapQueryToSearchParams } from "../../../src/utils/searchUtils"
import type { SearchQueryParams } from "../../../src/types/searchTypes"
import { logSingleFilterNoResults } from "../../../src/utils/logUtils"

jest.mock("../../../src/server/auth")
jest.mock("../../../src/server/api/search")
jest.mock("../../../src/utils/logUtils")

const mockReq = {
  headers: {
    host: "local.nypl.org:8080",
  },
  url: "/account",
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  },
}

const mockReqWithReferer = {
  ...mockReq,
  headers: {
    host: "local.nypl.org:8080",
    referer:
      "http://local.nypl.org:8080/research/research-catalog/bib/b16767329",
  },
}

describe("Search page", () => {
  beforeEach(() => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
      isTokenValid: true,
      errorCode: null,
      decodedPatron: { sub: "123" },
    })
  })

  describe("oclc search", () => {
    describe("with redirectOnMatch", () => {
      it("returns results if count > 1", async () => {
        ;(fetchSearchResults as jest.Mock).mockResolvedValue({
          status: 200,
          results: {
            totalResults: 2,
          },
        })

        const response = await getServerSideProps({
          req: mockReq,
          query: {
            oclc: "1234",
            redirectOnMatch: "something truthy",
          },
        })
        expect(response.props.results).toBeDefined()
      })

      it("redirect to bib if oclc matches one bib", async () => {
        ;(fetchSearchResults as jest.Mock).mockResolvedValue({
          status: 200,
          results: {
            totalResults: 1,
            itemListElement: [
              {
                result: {
                  uri: "bibid",
                },
              },
            ],
          },
        })

        const response = await getServerSideProps({
          req: mockReq,
          query: {
            oclc: "1234",
            redirectOnMatch: "true",
          },
        })
        expect(response.redirect).toEqual({
          destination: "/bib/bibid",
          permanent: false,
        })
      })
    })
  })

  describe("search errors", () => {
    it("handles invalid parameters", async () => {
      ;(fetchSearchResults as jest.Mock).mockResolvedValue({
        status: 422,
        message: "Invalid parameters",
      })

      const response = await getServerSideProps({
        req: mockReq,
        query: { q: "spaghetti" },
      })
      expect(response).toEqual({
        props: { errorStatus: 422 },
      })
    })
    it("handles no results found 404", async () => {
      ;(fetchSearchResults as jest.Mock).mockResolvedValue({
        status: 404,
        message: "No results found",
      })

      const response = await getServerSideProps({
        req: mockReq,
        query: { q: "spaghetti" },
      })
      expect(response).toEqual({
        props: { errorStatus: 404 },
      })
    })
    it("makes the correct call to logSingleFilterNoResults", async () => {
      const response404 = { status: 404, message: "No results found" }
      const query = { "filters[language][0]": "lang:fre" } as SearchQueryParams
      ;(fetchSearchResults as jest.Mock).mockResolvedValue(response404)

      await getServerSideProps({
        req: mockReqWithReferer,
        query,
      })
      expect(logSingleFilterNoResults).toHaveBeenCalledWith(
        "search page",
        response404,
        mapQueryToSearchParams(query),
        "http://local.nypl.org:8080/research/research-catalog/bib/b16767329"
      )
    })
    it("handles general server errors", async () => {
      ;(fetchSearchResults as jest.Mock).mockResolvedValue({
        status: 500,
        message: "No results found",
      })

      const response = await getServerSideProps({
        req: mockReq,
        query: { q: "spaghetti" },
      })
      expect(response).toEqual({
        props: { errorStatus: 500 },
      })
    })
  })
})
