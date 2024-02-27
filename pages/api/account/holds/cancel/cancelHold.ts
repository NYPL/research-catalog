import sierraClient from "../../../../../src/server/sierraClient"

export default async function cancelHold(holdId: string) {
  try {
    const client = await sierraClient()
    await client.deleteRequest(`patrons/holds/${holdId}`)
    return { status: 200, message: "Cancelled" }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.name || error.response.data.description,
    }
  }
}
