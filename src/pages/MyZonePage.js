import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import styles from './MyZonePage.module.scss'
import Modal from '../components/Modal'


const MyZonePage = () => {
  const { getLoans } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const [trigger, setTrigger] = useState(false)
  const [details, setDetails] = useState(null)
  const location = useLocation()

  const loading = () => {
    const el = document.getElementById('head')
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }



  const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
  useEffect(() => {
    getLoans()
    loading()
  }, [])
  const showDetails = (start, end, fee) => {
    setDetails({ start: start, end: end, fee: fee })
    setTrigger(true)
  }
  return (
    <>
    <div id='head'></div>
      <Modal trigger={trigger} setTrigger={setTrigger}>
        {details === null ? '' :
          <div>
            <h3 className='text-center display-4 mb-3'>Loan Details</h3>
            <ul>
              <li>
                <div className='py-2'>Date of start: {details.start}</div>
              </li>
              <li>
                <div className='py-2'>Date of return: {details.end}</div>
              </li>
              <li>
                <div className='py-2'>Fee per day: {details.fee}</div>
              </li>
            </ul>
            <p>* contact us for any problem </p>
          </div>
        }
      </Modal>
      {/* {location.state.location === 'loan the same book' && <h1>YOU HAVE ALREADY THIS BOOK!</h1>}

      {location.state && location.state.location === 'private' && <div>You came from the PRIVATE</div>}
      {location.state && location.state.location === 'nav' && <div>You came from the NAVBAR</div>} */}
      <h1 className='text-center'> My current books</h1>
      <div className={styles.all}>

        {user.active_loans && user.active_loans.map(item => (
          <div className={styles.card}>
            <div className={styles.img_wrapper}>
              <img className={`${styles.hero}`} src={item.img} alt='itay' />
              <div className={styles.color_overlay}></div>
            </div>
            <p className={styles.title}># {item.category}</p>
            <div className={styles.bottom}>
              <button onClick={() => showDetails(item.date_of_start, item.date_of_return, item.max_fee_per_day)} className={`${styles.btn1} ${styles.btn}`}>Details</button>
              <button className={`${styles.btn2} ${styles.btn}`}>Return</button>
              <div className={styles.days}><i className="fa-solid fa-clock"></i> {diffDays(new Date(), new Date(`${item.date_of_return.slice(0, 10).slice(6, 10)}-${item.date_of_return.slice(0, 10).slice(3, 5)}-${item.date_of_return.slice(0, 10).slice(0, 2)}`))} days left</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.author}>
              <img src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png' alt='itay' />
              <div>Creation of <span>{item.author}</span></div>
            </div>
            {/* <div className={styles.wrapper}>
            
              <h2>         
                {item.year_published} , By {item.author} ,  {item.book_name}
              </h2>
            </div> */}
          </div>
        ))}


      </div>
      <h1 className='text-center'> Loans history</h1>
      {user.history_loans && user.history_loans.map(item => (
        <div>
          <div>{item.category}</div>
          <div>{item.book_name}</div>
          <div>{item.date_of_return}</div>
          <div>{item.date_of_start}</div>
          <div>{item.status} Real Date </div>
          <div>
            {item.author} , {item.year_published}, {item.img}
          </div>
          <div>
            {item.max_days_to_loan}, {item.max_fee_per_day}
          </div>
        </div>
      ))}
      <h1>Maybe personal data will be on another place</h1>
    </>
  )
}

export default MyZonePage