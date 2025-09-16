import fs from "fs"
import path from "path"
import nyplCoreObjects from "@nypl/nypl-core-objects"

interface Aggregation {
  value: string
  label: string
}

const buildingLocation: Aggregation[] = [
  { value: "ma", label: "Stephen A. Schwarzman Building (SASB)" },
  {
    value: "pa",
    label: "The New York Public Library for the Performing Arts (LPA)",
  },
  { value: "sc", label: "Schomburg Center for Research in Black Culture" },
  { value: "rc", label: "Offsite - request in advance" },
  { value: "bu", label: "Stavros Niarchos Foundation Library (SNFL)" },
]

const loadSearchAggregations = async (): Promise<void> => {
  const _data = {
    buildingLocation,
    languages: [],
  }

  const vocabularies: Record<string, string> = {
    collections: "by-collection",
    formats: "by-formats",
  }

  try {
    // Load vocabularies that live in NYPL Core
    await Promise.all(
      Object.keys(vocabularies).map(async (vocab) => {
        const nyplCoreValues: any = await nyplCoreObjects(
          vocabularies[vocab as keyof typeof vocabularies]
        )

        if (vocab === "formats") {
          _data[vocab] = Object.values(nyplCoreValues).map(
            (val: { code: string; label: string }) => ({
              value: val.code,
              label: val.label,
            })
          )
        } else {
          _data[vocab] = nyplCoreValues
        }
      })
    )

    // Fetch ES language aggregations from Discovery API
    const response = await fetch(
      "http://localhost:8080/research/research-catalog/api/languages"
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch language data: ${response.statusText}`)
    }
    const languages: unknown = await response.json()
    _data.languages = languages as Aggregation[]

    const filePath = path.join(process.cwd(), "data", "searchAggregations.json")
    fs.writeFileSync(filePath, JSON.stringify(_data, null, 2))
    console.log("Successfully wrote to data/searchAggregations.json")
  } catch (error) {
    console.error("Error loading search aggregation data:", error)
    process.exit(1)
  }
}

loadSearchAggregations()
