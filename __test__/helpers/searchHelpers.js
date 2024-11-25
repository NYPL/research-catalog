/**
 * An effort to avoid brittleness due to potentially variable order in query
 * parameters. This testing util splits query strings into arrays that are
 * compared for matching elements instead of comparing for strict equality of
 * string literals.
 *  */

export const queryParamsEquality = (queryConstructor) => {
  return (test, queryParamsToConstruct) => {
    const testQueries = test.substring(1).split("&")
    const constructedQueries = queryConstructor(queryParamsToConstruct)
      .substring(1)
      .split("&")
    console.log(constructedQueries)
    console.log(testQueries)
    return (
      testQueries.every((queryParam) =>
        constructedQueries.includes(queryParam)
      ) &&
      constructedQueries.every((queryParam) => testQueries.includes(queryParam))
    )
  }
}
