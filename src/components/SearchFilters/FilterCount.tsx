import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import { filtersObjectLength } from "../../utils/searchUtils"

export const FilterCount = () => {
  const router = useRouter()
  const [filterCount, setFilterCount] = useState<number | null>(null)

  useEffect(() => {
    if (!router.isReady) return
    const count = filtersObjectLength(
      collapseMultiValueQueryParams(router.query)
    )
    setFilterCount(count)
  }, [router.isReady, router.query])

  return (
    <>{`Show filters${
      filterCount !== null && filterCount > 0 ? ` (${filterCount})` : ""
    }`}</>
  )
}
