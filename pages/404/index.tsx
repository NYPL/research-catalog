import type { RCPage } from "../../src/types/pageTypes"
import PageError from "../../src/components/Error/PageError"

type ErrorPageProps = {
  activePage: RCPage
}

// Test 404 page.
export default function Custom404({ activePage }: ErrorPageProps) {
  return <PageError page={activePage} errorStatus={404} />
}
