import wrapper from "@nypl/sierra-wrapper"
import aws from "aws-sdk"

interface KMSCache {
  client: string
  key: string
  secret: string
}

const key = process.env.SIERRA_KEY
const secret = process.env.SIERRA_SECRET
const base = process.env.SIERRA_BASE

if (!key || !base || !secret) {
  console.error("Missing Sierra credentials")
}
const creds = [key, base]
const CACHE: KMSCache = { client: "", key, secret }

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

const sierraClient = async () => {
  console.log("sierraClient")
  let decryptedKey: string
  let decryptedSecret: string
  try {
    console.log("before KMS")
    ;[decryptedKey, decryptedSecret] = await Promise.all(creds.map(decryptKMS))
    console.log("after KMS")
  } catch (exception) {
    console.error("Error decrypting Sierra credentials")
  }
  try {
    console.log("before wrapper config")
    await wrapper.config({
      base: base,
      key: decryptedKey,
      secret: decryptedSecret,
    })
    CACHE.key = decryptedKey
    CACHE.secret = decryptedSecret
    CACHE.client = wrapper
    console.log("after wrapper config")
    return wrapper
  } catch (error) {
    console.error(error)
  }
}

export default sierraClient
