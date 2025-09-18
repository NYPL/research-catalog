import fs from "fs"
import path from "path"

const loadSearchAggregations = async (): Promise<void> => {
  try {
    const response = await fetch(
      "http://localhost:8080/research/research-catalog/api/vocabularies"
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch vocabularies: ${response.statusText}`)
    }
    const data = await response.json()
    const filePath = path.join(process.cwd(), "data", "searchAggregations.json")
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    console.log("Successfully wrote to data/searchAggregations.json")
  } catch (error) {
    console.error("Error loading search aggregation data:", error)
    process.exit(1)
  }
}

loadSearchAggregations()
