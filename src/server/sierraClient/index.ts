import wrapper from "@nypl/sierra-wrapper"
import aws from "aws-sdk"

interface KMSCache {
  client: any
  key: string
  secret: string
}

const key = process.env.SIERRA_KEY
const secret = process.env.SIERRA_SECRET
const base = process.env.SIERRA_BASE

if (!key || !base || !secret) {
  console.error("Missing Sierra credentials")
}
const creds = [key, secret]
const CACHE: KMSCache = { client: {}, key, secret }

const kms: aws.KMS = new aws.KMS({
  region: "us-east-1",
})

const decryptKMS = async (key: string) => {
  console.log("Sierra client, decrypt func INPUT: " + key)
  const params = {
    CiphertextBlob: Buffer.from(key, "base64"),
  }
  try {
    const decrypted = await kms.decrypt(params).promise()
    return decrypted.Plaintext.toString()
  } catch (exception) {
    console.error(exception)
  }
}

export const sierraClient = async () => {
  if (CACHE.client?.get) return await Promise.resolve(CACHE.client)
  let decryptedKey: string
  let decryptedSecret: string
  try {
    ;[decryptedKey, decryptedSecret] = await Promise.all(creds.map(decryptKMS))
  } catch (exception) {
    console.error("Error decrypting Sierra credentials")
  }
  try {
    await wrapper.config({
      key: decryptedKey,
      secret: decryptedSecret,
      base: base,
    })

    CACHE.client = wrapper
    return wrapper
  } catch (error) {
    console.error(error.message)
  }
}
