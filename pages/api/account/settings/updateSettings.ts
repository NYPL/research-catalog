import sierraClient from "../../../../src/server/sierraClient"

export default async function updateSettings(
  patronId: string,
  patronData: any
) {
  try {
    const client = await sierraClient()
    await client.put(`patrons/${patronId}`, patronData)
    return { status: 200, message: "Updated" }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message || error.response.data.description,
    }
  }
}
