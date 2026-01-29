import { DecryptCommand, KMS } from "@aws-sdk/client-kms"
import { logServerError } from "../utils/logUtils"

const isVercel = !!process.env.VERCEL

console.log(
  "Investigate vercel aws env",
  process.env.VERCEL,
  process.env.AWS_SESSION_TOKEN,
  process.env.AWS_ACCESS_KEY_ID
)

const kms: KMS = new KMS({
  region: "us-east-1",

  // Ignore session token for static creds on Vercel
  ...(isVercel && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }),
})

const decryptKMS = async (key: string): Promise<string | null> => {
  const params = {
    CiphertextBlob: new Uint8Array(Buffer.from(key, "base64")),
  }

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
