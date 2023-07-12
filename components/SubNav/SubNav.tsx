import SubNavLink from '../SubNav/SubNavLink'
import styles from '../../styles/components/SubNav.module.scss'
const SubNav = () => {
  return (
    <nav className={styles.subNav}>
      <SubNavLink href="#" active>Text</SubNavLink>
    </nav>
  )
}

export default SubNav;