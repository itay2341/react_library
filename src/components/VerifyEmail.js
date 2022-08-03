import React from "react";
// import './verifyEmail.css'
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import jwtDecode from 'jwt-decode';
import styles from './VerifyEmail.module.scss'

const VerfiEmail = ({ formData, setFormData, setPage }) => {

  const { setUser } = useContext(AuthContext)
  const { setToken } = useContext(AuthContext)
  const emailVerify = async (e) => {
    e.preventDefault()
    const el = document.querySelector('#error')
    el.style.opacity = "0"
    try {
      const response = await fetch("http://127.0.0.1:8000/api/email_verify/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email": formData.email, "otp": formData.otp })
      })
      const data = await response.json()
      if (response.status === 200) {
        setPage((currPage) => currPage + 1)
        setToken({ refresh: data.refresh, access: data.access })
        setUser(jwtDecode(data.access))
        localStorage.setItem("AuthToken", JSON.stringify({ refresh: data.refresh, access: data.access }))
      } else {
        const el = document.querySelector('#error')
        el.style.opacity = "1"
      }
    } catch (error) { console.log(error) }
  }

  return (
    <div className={styles.outer}>
      <form onSubmit={(e) => emailVerify(e)} className={styles.form}>
        <div className={styles.header}>
          <p>Verification</p>
        </div>
        <div className={styles.description}>
          <p>Verification code has been sent to your email adress!
            Check it out and come back to verify your email.</p>
        </div>
        <div className={styles.input}>
          <input type="text" className={styles.button1} placeholder="enter your code..." required
            value={formData.otp}
            onChange={(e) => {
              setFormData({ ...formData, otp: e.target.value });
            }} />
          <input type="submit" className={styles.button2} id="submit" value="Verify Email" />
        </div>
      </form>
      <div id="error" className={styles.error}>
      <i className="fa-solid fa-triangle-exclamation"></i>
            Invalid Code
      </div>
      <button onClick={() =>setPage(0)} className={styles.btn}>go back</button>
    </div>

  );
}

export default VerfiEmail;
