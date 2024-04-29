import aws from "aws-sdk"
import logger from "../../logger"

const kms: aws.KMS = new aws.KMS({
  region: "us-east-1",
})

export const kmsDecryptCreds = async (creds: string[]) => {
  return await Promise.all(creds.map(decryptKMS))
}

const decryptKMS = async (key: string) => {
  logger.info("Decrypt func INPUT: " + key)
  const params = {
    CiphertextBlob: Buffer.from(key, "base64"),
  }
  try {
    const decrypted = await kms.decrypt(params).promise()
    return decrypted.Plaintext.toString()
  } catch (exception) {
    logger.error(exception)
  }
}
