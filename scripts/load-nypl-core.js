import nyplCoreObjects from "@nypl/nypl-core-objects"
import fs from "fs"
import path from "path"

const loadNyplCoreData = async () => {
  const _data = {}
  const vocabularies = {
    collection: "by-collection",
    format: "by-formats",
  }

  try {
    await Promise.all(
      Object.keys(vocabularies).map(async (vocab) => {
        const nyplCoreValues = await nyplCoreObjects(vocabularies[vocab])

        if (vocab === "format") {
          // only transform formats into array of { code, label }
          _data[vocab] = Object.values(nyplCoreValues).map((val) => ({
            code: val.code,
            label: val.label,
          }))
        } else {
          _data[vocab] = nyplCoreValues
        }
      })
    )

    // add static buildingLocation object
    _data.buildingLocation = [
      {
        value: "ma",
        label: "Stephen A. Schwarzman Building (SASB)",
      },
      {
        value: "pa",
        label: "The New York Public Library for the Performing Arts (LPA)",
      },
      {
        value: "sc",
        label: "Schomburg Center for Research in Black Culture",
      },
      {
        value: "rc",
        label: "Offsite - request in advance",
      },
      {
        value: "bu",
        label: "Stavros Niarchos Foundation Library (SNFL)",
      },
    ]

    const filePath = path.join(process.cwd(), "public", "nypl-core-data.json")
    fs.writeFileSync(filePath, JSON.stringify(_data, null, 2))
  } catch (error) {
    console.error("Error fetching NYPL core data:", error)
    process.exit(1)
  }
}

loadNyplCoreData()
