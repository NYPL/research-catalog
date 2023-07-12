import {
  Link as DSLink
} from '@nypl/design-system-react-components'
import classNames from 'classnames'
import Link from 'next/link'

type SubNavLinkProps = {
  active: boolean,
  href: string,
  children: string,
};

const SubNavLink = ({ active, href, children }: SubNavLinkProps) => {
  return (
    <Link href={href} className={classNames()} passHref>
      <DSLink type='action'>{children}</DSLink>
    </Link>
  )
}

export default SubNavLink