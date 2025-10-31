import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms"
import { fromNodeProviderChain } from "@aws-sdk/credential-providers"
import { NodeHttpHandler } from "@aws-sdk/node-http-handler"
import { logServerError } from "../utils/appUtils"

/**
 * Only use SSO (Node provider chain) if running locally.
 * Otherwise, leave credentials undefined so the IAM role is used.
 */
const kms = new KMSClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials:
    process.env.APP_ENV === "development" ? fromNodeProviderChain() : undefined,
  requestHandler: new NodeHttpHandler({
    socketTimeout: 5000,
    connectionTimeout: 5000,
  }),
  maxAttempts: 1,
})

const decryptKMS = async (key: string): Promise<string | null> => {
  const ciphertext = Buffer.from(key, "base64")

  const command = new DecryptCommand({
    CiphertextBlob: new Uint8Array(ciphertext),
  })

  try {
    const decrypted = await Promise.race([
      kms.send(command),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Decryption timed out")), 5000)
      ),
    ])

    if (!decrypted.Plaintext) throw new Error("Empty plaintext")
    const plaintext = Buffer.from(decrypted.Plaintext).toString("utf8")

    return plaintext
  } catch (error: any) {
    logServerError("decryptKMS", error.message)
    return null
  }
}

export const kmsDecryptCreds = async (
  creds: string[]
): Promise<(string | null)[]> => {
  const results: (string | null)[] = []
  for (const key of creds) {
    const plaintext = await decryptKMS(key)
    results.push(plaintext)
  }
  return results
}
