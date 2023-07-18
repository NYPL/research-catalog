import SubNavLink from "@/components/SubNav/SubNavLink"
import styles from "@/styles/components/SubNav.module.scss"

const SubNav = () => {
  return (
    <nav className={styles.subNav} aria-label="Research Catalog main menu">
      <ul>
        <li>
          <SubNavLink href="/" active>
            Search
          </SubNavLink>
        </li>
        <li>
          <SubNavLink href="/subject_headings">
            Subject Heading Explorer
          </SubNavLink>
        </li>
        <li>
          <SubNavLink href="/account">My Account</SubNavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SubNav
