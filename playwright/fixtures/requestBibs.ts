/**
 * Pool of bib IDs with requestable physical items on the QA server.
 * Replace these with verified bib numbers before use.
 */
export const REQUEST_BIB_POOL = [
  "b14661938",
  "b14661939",
  "b14661940",
  "b14661941",
  "b14661942",
  "b14661945",
  "b14995035",
  "b15002080",
  "b16876229",
  "cb27742119",
  "pb8553362",
  "b16776978",
  "b14661938",
  "b16317338",
  "b22153953",
  "b22196844",
  "b10908647",
  "pb9985533623506421",
  "b16312827",
  "b13272516",
  "b10700703",
  "b10760503",
  "cb6179379",
  "b15401392",
  "b15401375",
  "b11855452",
  "b15401387",
  "b15401391",
  "b15401485",
  "b10535041",
  "b15401580",
  "b15461678",
  "b10167743",
]

export function pickRequestBibId(): string {
  return REQUEST_BIB_POOL[Math.floor(Math.random() * REQUEST_BIB_POOL.length)]
}
