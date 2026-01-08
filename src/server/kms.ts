import { DecryptCommand, KMS } from "@aws-sdk/client-kms"
import { logServerError } from "../utils/appUtils"

const kms: KMS = new KMS({ region: "us-east-1" })

const decryptKMS = async (key: string): Promise<string | null> => {
  const params = {
    CiphertextBlob: new Uint8Array(Buffer.from(key, "base64")),
  }
  console.log("key", key)
  console.log({
    hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
    hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
    hasSessionToken: !!process.env.AWS_SESSION_TOKEN,
  })

  try {
    const decrypted = await kms.send(new DecryptCommand(params))
    if (!decrypted.Plaintext) throw new Error("Empty plaintext")
    return Buffer.from(decrypted.Plaintext).toString("utf8")
  } catch (error: any) {
    logServerError("decryptKMS", error.message)
    return null
  }
}

export const kmsDecryptCreds = async (creds: string[]) => {
  return Promise.all(creds.map(decryptKMS))
}
