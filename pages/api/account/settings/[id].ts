import type { NextApiResponse, NextApiRequest } from "next"
import initializePatronTokenAuth from "../../../../src/server/auth"
import { updatePatronSettings } from "../helpers"

/**
 * API route handler for /api/account/settings/{patronId}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseMessage = "Request error"
  let responseStatus = 400
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    responseStatus = 403
    responseMessage = "No authenticated patron"
    return res.status(responseStatus).json(responseMessage)
  }

  if (req.method == "GET") {
    responseMessage = "Please make a PUT request to this endpoint."
  }

  // Account settings form submission without JS.
  if (req.method === "POST") {
    const action = req.body.delete ? "delete" : "save"
    const patronId = req.query.id as string
    const patronData = req.body.emails.filter((email) => email.trim() !== "")

    if (action === "delete") {
      const indexToDelete = parseInt(req.body.delete, 10)
      if (indexToDelete >= 0) {
        patronData.splice(indexToDelete, 1)
      }
    }
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/

    // Filter out invalid emails
    const invalidEmails = patronData.filter(
      (email) => email && !emailRegex.test(email)
    )

    // If there are invalid emails, redirect back with an error message
    if (invalidEmails.length > 0) {
      const errorMessage = `Please enter a valid email. Invalid emails: ${invalidEmails.join(
        ", "
      )}`
      res.writeHead(302, {
        Location: `/research/research-catalog/account/settings?error=${encodeURIComponent(
          errorMessage
        )}`,
      })
      res.end()
      return
    }

    // Remove duplicate emails while keeping the first
    const uniqueEmails = patronData.reduce((acc, email) => {
      const normalizedEmail = email.toLowerCase()
      if (!acc.includes(normalizedEmail)) {
        acc.push(normalizedEmail)
      }
      return acc
    }, [])

    const duplicateEmails = patronData.length !== uniqueEmails.length

    if (duplicateEmails) {
      const errorMessage = "Cannot use duplicate emails."
      res.writeHead(302, {
        Location: `/research/research-catalog/account/settings?error=${encodeURIComponent(
          errorMessage
        )}`,
      })
      res.end()
      return
    }

    const response = await updatePatronSettings(patronId, {
      emails: patronData.filter((email) => email !== ""),
    })
    if (response.status === 200) {
      res.writeHead(302, {
        Location: "/research/research-catalog/account/settings?success=true",
      })
    } else {
      const errorMessage = `Error updating emails: ${response.message}`
      res.writeHead(302, {
        Location: `/research/research-catalog/account/settings?error=${encodeURIComponent(
          errorMessage
        )}`,
      })
    }

    res.end()
  }

  if (req.method == "PUT") {
    /**  We get the patron id from the request: */
    const patronId = req.query.id as string
    const patronData = req.body
    /**  We check that the patron cookie matches the patron id in the request,
     * i.e.,the logged in user is updating their own settings. */
    if (patronId == cookiePatronId) {
      const response = await updatePatronSettings(patronId, patronData)
      responseStatus = response.status
      responseMessage = response.message
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not match request"
    }
  }
  res.status(responseStatus).json(responseMessage)
}
