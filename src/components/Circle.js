import React from 'react'
import styles from './Circle.module.scss'

const Circle = () => {
  return (
    <div className={styles.loader}>
        <div className={styles.circle} style={{color:"#04fc43"}}></div>
        <div className={`${styles.circle} ${styles.circle2}`} style={{color:"#fee800"}}></div>
        <div className={`${styles.circle} ${styles.circle3}}`} style={{color:"#ff00be"}}></div>
    </div>
   )
}

export default Circle