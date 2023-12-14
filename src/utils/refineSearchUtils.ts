export const parseFilters = (queryParams: object) => {
  return Object.keys(queryParams)
    .filter((param) => param.includes("filters["))
    .reduce((acc, currentFilter) => {
      const field = currentFilter.split("[")[1].split("]")[0]
      if (acc[field]) acc[field].push(queryParams[currentFilter])
      else acc[field] = [queryParams[currentFilter]]
      return acc
    }, {})
}

// export const buildFilters = (filters: object) => {
//   return Object.keys(filters)
//     .map((field) =>
//       filters[field]
//         .map(
//           (option: string, i: number) =>
//             `&filters[${field}][${i}]=${encodeURI(option)}`
//         )
//         .join("")
//     )
//     .join("")
// }

export const buildFilters = (filters: object) => {
  return Object.keys(filters).reduce((acc, field) => {
    filters[field].forEach(
      (option, i) => (acc[`filters[${field}][${i}]`] = encodeURI(option))
    )
    return acc
  }, {})
}
