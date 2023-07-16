import SubNavLink from "@/components/SubNav/SubNavLink"
import styles from "@/styles/components/SubNav.module.scss"

const SubNav = () => {
  return (
    <nav className={styles.subNav}>
      <ul>
        <li>
          <SubNavLink href="/" active>
            Search
          </SubNavLink>
        </li>
        <li>
          <SubNavLink href="/subject_headings">Search</SubNavLink>
        </li>
        <li>
          <SubNavLink href="/account">My Account</SubNavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SubNav
