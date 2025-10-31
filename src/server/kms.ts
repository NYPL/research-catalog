import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms"
import { fromNodeProviderChain } from "@aws-sdk/credential-providers"
import { NodeHttpHandler } from "@aws-sdk/node-http-handler"
import { logServerError } from "../utils/appUtils"

const kms = new KMSClient({
  region: "us-east-1",
  credentials: fromNodeProviderChain(),
  requestHandler: new NodeHttpHandler({
    socketTimeout: 5000,
    connectionTimeout: 5000,
  }),
})

const decryptKMS = async (key: string) => {
  const ciphertext = Buffer.from(key, "base64")
  const params = {
    CiphertextBlob: new Uint8Array(ciphertext),
  }

  try {
    const decrypted = await Promise.race([
      kms.send(new DecryptCommand(params)),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Decryption timed out")), 5000)
      ),
    ])

    if (!decrypted.Plaintext) throw new Error("Empty plaintext")

    const plaintext = Buffer.from(decrypted.Plaintext).toString("utf8")

    return plaintext
  } catch (error) {
    logServerError("decryptKMS", error.message)
    return null
  }
}

export const kmsDecryptCreds = async (creds: string[]) => {
  const results: (string | null)[] = []
  for (const key of creds) {
    const plaintext = await decryptKMS(key)
    results.push(plaintext)
  }
  return results
}
