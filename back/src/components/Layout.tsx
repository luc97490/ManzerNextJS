import React, { ReactNode } from 'react'
import Header from './Header'
import styles from '@/components/Layout.module.css'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div className={styles.menuBackground}>
    <Header />
    <div className={styles.layout}>{props.children}</div>
  </div>
)

export default Layout
