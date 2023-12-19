export async function nyplCore (which: string) {
  const response = await fetch(`https://nypl-core-objects-mapping-qa.s3.amazonaws.com/by_${which}.json`)

  if (response.status >= 400) {
    throw new Error(`Could not fetch ${which} from nypl-core S3`)
  }

  const mapping = await response.json()
    .catch((e) => {
      throw new Error(`Could not parse ${which} from nypl-core S3: ${e.message}`)
    })

  return mapping
}
