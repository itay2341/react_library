import React from 'react'
import styles from './MiniFooter.module.scss'

const MiniFooter = () => {
  return (
    <div className={styles.footer}>
      <ul className={`${styles.social_network} ${styles.social_circle}`}>
        <li><a className={styles.icoLinkedin} href="https://www.linkedin.com/in/priyank1205" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
        <li><a className={styles.icoTwitter} href="https://twitter.com/priyank1205" title="Twitter"><i className="fa fa-twitter"></i></a></li>
        {/* <li><a className={styles.icoMedium} href="https://medium.com/@priyank1205" title="Medium"><i className="fa fa-medium"></i></a></li>
      <li><a className={styles.icoQuora} href="https://www.quora.com/profile/Priyank-Agarwal-7" title="Quora"><i className="fa fa-quora"></i></a></li> */}
        <li><a className={styles.icoFacebook} href="https://www.facebook.com/priyank.agarwal1205" title="Facebook"><i className="fa fa-facebook"></i></a></li>
        <li><a className={styles.icoInstagram} href="https://www.instagram.com/priyank.agarwal1205/" title="Instagram"><i className="fa fa-instagram"></i></a></li>
      </ul>
    </div>
  )
}

export default MiniFooter