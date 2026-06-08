import { Link } from "@nypl/design-system-react-components"
import type { NextRouter } from "next/router"

interface BackButtonProps {
  router: NextRouter
  backUrl: string
}

export const BackButton = ({ router, backUrl }: BackButtonProps) => {
  return (
    <Link
      variant="buttonSecondary"
      id="back-index"
      width={{ base: "100%", md: "fit-content" }}
      onClick={() => router.push(backUrl)}
      gap="xxs"
      mt="xxs"
      background="white"
      mb={{ base: "xs", md: 0 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
          fill="#0069BF"
        />
      </svg>
      Back to index
    </Link>
  )
}
