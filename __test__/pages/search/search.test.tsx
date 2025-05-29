import { getServerSideProps } from "../../../pages/search/index"
import initializePatronTokenAuth from "../../../src/server/auth"
import { fetchResults } from "../../../src/server/api/search"

jest.mock("../../../src/server/auth")
jest.mock("../../../src/server/api/search")

const mockReq = {
  headers: {
    host: "local.nypl.org:8080",
  },
  url: "/account",
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
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
        ;(fetchResults as jest.Mock).mockResolvedValue({
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

      it("redirect to bib if oclc maches one bib", async () => {
        ;(fetchResults as jest.Mock).mockResolvedValue({
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
})
