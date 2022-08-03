import { useContext, useState, useEffect } from "react"
import React from 'react'
import AuthContext from "../context/AuthContext"
import BooksRounded from "../components/BooksRounded"
import { useLocation, Link, useNavigate } from "react-router-dom"
import Modal from '../components/Modal'
import Login from '../components/Login'
import styles from './HomePage.module.scss'
import SignUp from "../components/SignUp"

const HomePage = () => {
  const { user } = useContext(AuthContext)
  const { setActive } = useContext(AuthContext)
  const { scrollAgain } = useContext(AuthContext)
  const { preventScroll } = useContext(AuthContext)
  const location = useLocation()
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()
  const loading = () => {
    const el = document.getElementById('head')
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  useEffect(() => {
    loading()
  }, [])
  const info = () => {
    setActive('info')
    navigate('/info')
  }
  const goToBooks = () => {
    setActive('books')
    navigate('/books')
  }

  const login = () => {
    preventScroll()
    setTrigger(true)
  }

  const goToRegister = () => {
    setActive('register')
    navigate('/register')
  }
  return (
    <>
    <div  id="head" ></div>
      <Modal trigger={trigger} setTrigger={setTrigger} scrollAgain={scrollAgain}>
        <Login setBtnPopUp={setTrigger} scrollAgain={scrollAgain} />
      </Modal>
      <header className={styles.pic}>
        <div>
          <div className={styles.buttons}>
            <button className={styles.btn1} onClick={() => login()}>Login now</button>
            <button className={styles.btn2}><a className={styles.href} href="#contact">Contact us</a></button>
          </div>
        </div>
      </header>
      {location.state && location.state.location === 'logout' && <div>You came from the LOGOUT</div>}
      {user && <div className="text-center py-3" onClick={() => console.log(user)}>Hi - user - {user.user_id} </div>}
      <h1 className="text-center p-3">Some Pupolar Books...</h1>
      <BooksRounded />
      <div className={styles.infoBooks}>
        <button onClick={() => goToBooks()} className={styles.headerInfo}>Go find a book</button>
      </div>
      <div className="text-center">
        <button onClick={() => info()}>About us</button>
        <div onClick={()=>goToRegister()}>You don't have an account? Join now</div><br />
        <h2>PASSWORD MANAGER</h2>
        <main id="contact" className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
              <div className="my-3">
                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                  <div className="form-floating m-4">
                    <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                    <label htmlFor="name">Name</label>
                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                  </div>
                  <div className="form-floating m-4">
                    <input className="form-control" id="email" type="email" placeholder="Enter your email..." data-sb-validations="required,email" />
                    <label htmlFor="email">Email address</label>
                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                  </div>
                  <div className="form-floating m-4">
                    <input className="form-control" id="phone" type="tel" placeholder="Enter your phone number..." data-sb-validations="required" />
                    <label htmlFor="phone">Phone Number</label>
                    <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                  </div>
                  <div className="form-floating m-4">
                    <textarea className="form-control" id="message" placeholder="Enter your message here..." style={{ height: "12rem" }} data-sb-validations="required"></textarea>
                    <label htmlFor="message">Message</label>
                    <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                  </div>
                  <br />
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3">
                      <div className="fw-bolder">Form submission successful!</div>
                      To activate this form, sign up at
                      <br />
                      <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                    </div>
                  </div>
                  <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                  <button className="btn btn-primary text-uppercase disabled" id="submitButton" type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default HomePage