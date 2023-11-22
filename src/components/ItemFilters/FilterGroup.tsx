import {
  Card,
  CardHeading,
  CardContent,
} from "@nypl/design-system-react-components"

const FilterGroup = (children, headingText, className, ref) => {
  return (
    <Card className={className} ref={ref}>
      <CardHeading level="h3" size="heading6">
        {headingText}
      </CardHeading>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default FilterGroup
