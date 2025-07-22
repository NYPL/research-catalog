import { Box, Text, Banner } from "@nypl/design-system-react-components"

export const CopyrightRestrictionsBanner = () => {
  return (
    <Banner
      variant="neutral"
      heading="Copyright restrictions"
      content={
        <Box mt="xs">
          <Text mb="s">
            The copyright law of the United States (Title 17, United States
            Code) governs the making of photocopies or other reproductions of
            copyrighted material.
          </Text>
          <Text mb="s">
            Under certain conditions specified in the law, libraries and
            archives are authorized to furnish a photocopy or other
            reproduction. One of these specific conditions is that the photocopy
            or reproduction is not to be “used for any purpose other than
            private study, scholarship, or research.” If a user makes a request
            for, or later uses, a photocopy or reproduction for purposes in
            excess of “fair use,” that user may be liable for copyright
            infringement.
          </Text>
          <Text mb="s">
            This institution reserves the right to refuse to accept a copying
            order if, in its judgment, fulfillment of the order would involve
            violation of copyright law.
          </Text>
        </Box>
      }
      mb="s"
    />
  )
}

export default CopyrightRestrictionsBanner
