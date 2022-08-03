import React from 'react'
import styles from './SignUp.module.scss'
const SignUp = ({ formData, setFormData, setPage }) => {

    const setTime = id => {
        setTimeout(async ()=>{
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}/`, {
              method: 'DELETE'
            })
            } catch (error) {console.log(error)}  
        },1000 * 60 * 0.5)
      }
    
    const register = async (e) => {
        e.preventDefault()
        const el = document.querySelector('#email')
        const el1 = document.querySelector('#password')
        const el2 = document.querySelector('#password2')
        el.innerHTML = ""
        el1.innerHTML = ""
        el2.innerHTML = ""
        try {
          const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "email": formData.email, "password": formData.password, "password2": formData.confirmPassword })
          })
          const data = await response.json()
          if (response.status === 200) {
            setPage((currPage) => currPage + 1)
            setTime(data.id)
          } else if (response.status === 400) {
            if (data.email !== undefined && data.email[0] === "new user with this email adress already exists.") {
              const el = document.querySelector('#email')
              el.innerHTML = "*email already exist"
            } if (data.email !== undefined && data.email[0] === "Enter a valid email address.") {
              const el = document.querySelector('#email')
              el.innerHTML = "*email is not valid"
            } if (data.password !== undefined && data.password === "Password must match") {
              const el = document.querySelector('#password')
              el.innerHTML = "*password does not match"
            } if (data.password2 !== undefined && data.password2[0] !== undefined && data.password2[0] === "Ensure this field has at least 8 characters.") {
              const el = document.querySelector('#password2')
              el.innerHTML = "*password is not valid"
            }
          }
        } catch (error) { console.log(error) }
      }
    
    return (
        <div>
            <div className={styles.form_wrapper}>
                <div className={styles.form_container}>
                    <div className={styles.title_container}>
                        <h2>Get started</h2>
                    </div>
                    <div className={`${styles.row} ${styles.clearfix}`}>
                        <div>
                            <form onSubmit={(e) => register(e)}>
                                <div className={styles.input_field}> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                    <input type="email" name="email" placeholder="Email" required 
                                    value={formData.email}
                                    onChange={(event) =>
                                      setFormData({ ...formData, email: event.target.value })
                                    }/>
                                </div> <span className={styles.email} id="email"></span>
                                <div className={styles.input_field}> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                    <input type="password" name="password" placeholder="Password" required 
                                    value={formData.password}
                                    onChange={(event) =>
                                      setFormData({ ...formData, password: event.target.value })
                                    }/> 
                                </div> <span className={styles.password} id="password"></span>
                                <div className={styles.input_field}> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                    <input type="password" name="password2" placeholder="Re-type Password" required 
                                     value={formData.confirmPassword}
                                     onChange={(event) =>
                                       setFormData({ ...formData, confirmPassword: event.target.value })
                                     }/>
                                </div>    <span className={styles.password2} id="password2"></span>
                                <div className={`${styles.input_field} ${styles.checkbox_option}`}>
                                    <input required type="checkbox" id="cb1" />
                                    <label htmlFor="cb1">I agree with terms and conditions</label>
                                </div>
                                <div className={`${styles.input_field} ${styles.checkbox_option}`}>
                                    <input type="checkbox" id="cb2" />
                                    <label htmlFor="cb2">I want to receive the newsletter</label>
                                </div>
                                <input className={styles.button} type="submit" value="Register" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp