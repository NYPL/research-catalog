import sierraClient from "../../../src/server/sierraClient"

/**
 * PUT request to Sierra to update patron PIN, first validating with previous PIN.
 * Returns status and message about request.
 */
export async function updatePin(
  patronId: string,
  barcode: string,
  oldPin: string,
  newPin: string
) {
  try {
    const client = await sierraClient()
    await client.post("patrons/validate", {
      barcode: barcode,
      pin: oldPin,
    })
    await client.put(`patrons/${patronId}`, { pin: newPin })
    return { status: 200, message: `Pin updated to ${newPin}` }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message || error.response.data.description,
    }
  }
}

/**
 * PUT request to Sierra to update patron settings. Returns status and message about request.
 */
export async function updatePatronSettings(patronId: string, patronData: any) {
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
/**
 * PUT request to Sierra to update a patron's hold. Returns status and message about request.
 */
export async function updateHold(holdId: string, holdData: any) {
  try {
    const client = await sierraClient()
    await client.put(`patrons/holds/${holdId}`, holdData)
    return { status: 200, message: "Updated" }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message || error.response.data.description,
    }
  }
}

/**
 * DELETE request to Sierra to cancel a patron's hold. Returns status and message about request.
 */
export async function cancelHold(holdId: string) {
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

/**
 * POST request to Sierra to renew a patron's checkout. Returns status, message about request, and
 * (if successful) the checkout object.
 */
export async function renewCheckout(checkoutId: string) {
  try {
    const client = await sierraClient()
    const response = await client.post(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    return { status: 200, message: "Renewed", body: response }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message || error.response.data.description,
    }
  }
}
