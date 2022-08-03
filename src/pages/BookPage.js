import React from 'react'
import styles from './BookPage.module.scss'
import Modal from '../components/Modal'
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import Login from '../components/Login'


const BookPage = props => {
  const {user} = useContext(AuthContext)
  const {preventScroll} = useContext(AuthContext)
  const {scrollAgain} = useContext(AuthContext)
  const { loanBook } = useContext(AuthContext)
  const [btnPopUp, setBtnPopUp] = useState(false)
  const [btnPopUp2, setBtnPopUp2] = useState(false)


  const loading = () => {
    const el = document.getElementById('head')
    el.scrollIntoView({behavior:'smooth',block:'center'})
  }
  useEffect(()=>{
    loading()
  },[])
  
  const checking = () => {
    preventScroll()
    if (user === null) {
      setBtnPopUp2(true)
    } else {setBtnPopUp(true)}
  }
  const loaning = () => {
    if (user === null) {
      setBtnPopUp(false)
      setBtnPopUp2(true)
    } else {
      setBtnPopUp(false)
      scrollAgain()
      loanBook(props.book.id)
    }
  }
  return (
    <>
    <div id='head'></div>
      <Modal trigger={btnPopUp} setTrigger={setBtnPopUp} scrollAgain={scrollAgain}>
        <div className={styles.rulesHeader}>
        <h1>Basic rules</h1>
        </div>
        <ul>
          <li className={styles.item2}>
          The maximum days to loan this book is {props.book.day_to_loan}
          </li>
          <li className={styles.item2}>
          Also we have a fee of {props.book.fee_per_day} ILS per day
          </li>
        </ul>
        <p className={styles.para2}>Have fun!</p>
        <button className={styles.btn2} onClick={() => loaning() }>Confirm and start reading</button>
      </Modal>
      <Modal trigger={btnPopUp2} setTrigger={setBtnPopUp2} scrollAgain={scrollAgain}>
        <Login setBtnPopUp={setBtnPopUp2} scrollAgain={scrollAgain} />
      </Modal>


        {props.book === null ? <div>Problem</div> :

          <div className={styles.details} >

            <div className={styles.big_img}>
              <img src={props.book.imgURL} alt="itay" />
            </div>
            <div className={styles.box}>
              <div className={styles.row}>
                <h2>{props.book.name}</h2>
              </div>
              <p>{props.book.yearPublished}, <span>By {props.book.author}</span></p>
              <p>{props.book.info}</p>
              <button onClick={()=> checking()} className={styles.cart}>Loan</button>
              <button onClick={() => props.goBack(props.book.id)} className={`${styles.cart} ${styles.back}`}>Go back</button>
            </div>
          </div>
        }
    </>
  )
}

export default BookPage