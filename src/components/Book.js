import React from 'react'
import styles from './Book.module.scss'
import {motion} from 'framer-motion'

const Book = props => {
  return (
    <motion.div onClick={()=>props.loan(props.id)}
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    layout className={styles.bx}>
      <img src={props.img} alt="itay" />
      <div className={styles.content}>
        <h3>{props.name}</h3>
        <p>{props.year}, by - {props.author}</p>
        <h6><span className={
          `${props.category === 'Nonfiction' && styles.nonfiction}
          ${props.category === 'Fiction' && styles.fiction}
          ${props.category === 'Food' && styles.food}
          ${props.category === 'Philosophy' && styles.philosophy}
          ${props.category === 'Nostalgic' && styles.nostalgic}`
        }>{props.category}</span><i className="bi bi-star-fill"></i> 9.0</h6>
      </div>
    </motion.div>
      )
}

      export default Book