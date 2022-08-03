import React from 'react'
import styles from './Login.module.scss'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Login = props => {
    const { loginUser } = useContext(AuthContext)
    const { setActive } = useContext(AuthContext)
    const navigate = useNavigate()
    const login = e => {
        props.setBtnPopUp(false)
        props.scrollAgain()
        loginUser(e)
    }
    const goToRegister = () => {
        props.setBtnPopUp(false)
        props.scrollAgain()
        setActive('register')
        navigate('/register')
    }

    const exit = () => {
        props.setBtnPopUp(false)
        props.scrollAgain()
    }
    return (
        <form onSubmit={e => login(e)} className={styles.login}>
            <i onClick={() => exit()} className="fa-solid fa-circle-xmark"></i>
            <h1>Get in!</h1>
            <div className={styles.input_field}> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className={styles.input_field}> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                <input type="password" name="password" placeholder="Password" required />
            </div>
            {/* <input name='email' type="email" placeholder="Email" />
            <input name='password' type="password" placeholder="Password" /> */}
            <div className={styles.dropDown}>
                <i className={`fa-solid fa-circle-info`}>
                    <div className={styles.dropMenu}>
                        <div><a href='#'>Forgot your password ?</a></div>
                        <div><a href='#'>Login with social media</a></div>
                    </div>
                </i>
            </div>
            <div>
                <button className={`${styles.btn} ${styles.home}`} type='submit'>Login</button>
            </div>
            <div onClick={() => goToRegister()} className={styles.regis}>Don't have an account? <span>register now</span> </div>
        </form>
    )
}

export default Login