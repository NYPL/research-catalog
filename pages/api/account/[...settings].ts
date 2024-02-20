import type { NextApiResponse } from "next"
import type { NextRequest } from "next/server"
import sierraClient from "../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../src/server/auth"

/**
 * API route handler for /api/account/settings
 */

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const patronTokenResponse = await initializePatronTokenAuth(req)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    res.status(403).json({
      message: "No authenticated patron",
    })
  }
  const patronSettingsMatch = req.url.match(/\/settings\/(\d+)/)
  if (patronSettingsMatch) {
    const patronId = patronSettingsMatch[1]
    const patronData = req.body
    /** The url contains the patron's id. We check that the patron cookie matches this id,
     * i.e., the logged in user is updating their own settings. */
    if (patronId == cookiePatronId && patronData) {
      const response = await settingsUpdate(patronId, patronData)
      res.status(response.status)
      res.json(response.message)
    }
  }
}

export async function settingsUpdate(patronId: string, patronData: any) {
  try {
    const client = await sierraClient()
    await client.put(`patrons/${patronId}`, patronData)
    return { status: 200, message: "Updated" }
  } catch (error) {
    return { status: 500, message: "Error" }
  }
}
