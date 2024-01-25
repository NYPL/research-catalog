import aws from "aws-sdk"

const kms: aws.KMS = new aws.KMS({
  region: "us-east-1",
})

export const decryptKMS = async (key: string): Promise<string> => {
  const params = {
    CiphertextBlob: Buffer.from(key, "base64"),
  }
  const { Plaintext } = await kms.decrypt(params).promise()

  return await new Promise((resolve, reject) => {
    kms.decrypt(params, (err: Error) => {
      if (err) {
        console.log({ err })
        reject(err)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        resolve(Plaintext.toString())
      }
    })
  })
}
