import React from 'react'
import { motion } from 'framer-motion'
import { useState, useContext } from 'react'
import styles from './Example.module.scss'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Example = props => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const loanAbook = () => {
    setIsOpen(prev => !prev)
    if (user)
      navigate('/')
    else {
      navigate('/register')
    }
  }
  return (
    <div className={styles.main}>
      <motion.div transition={{ layout: { duration: 1, type: 'spring' } }} layout onClick={() => setIsOpen(!isOpen)} className={styles.card}>
        {isOpen ? (
          <motion.div animate={{scale:1}} className={styles.content}>
            <motion.div className={styles.div1}>
              <motion.h2 className={styles.header} layout='position' >{props.name}</motion.h2>
              <p>By {props.author}<br></br>
                Published at {props.year}
              </p>
              <motion.button className={styles.btn} onClick={() => loanAbook()}>
                It's intrested me! I want to read more
              </motion.button>
            </motion.div>
            <motion.div className={styles.div2}>
              <img width={200} src={props.img} />
            </motion.div>
            {/* <p>{props.info}</p> */}
          </motion.div>
        ) : (
          <motion.div animate={{scale:1}}  initial={{scale:0.3}} className={styles.img}>
            <img width={200} src={props.img} alt='itay' />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Example