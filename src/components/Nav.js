import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Nav.module.scss'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import Modal from '../components/Modal'
import Login from './Login'


const Nav = () => {
    const [btnPopUp, setBtnPopUp] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useContext(AuthContext)
    const { logoutUser } = useContext(AuthContext)
    const { active } = useContext(AuthContext)
    const { setActive } = useContext(AuthContext)
    const { preventScroll } = useContext(AuthContext)
    const { scrollAgain } = useContext(AuthContext)
    const openNav = () => {
        if (isOpen) {
            scrollAgain()
            setIsOpen(prev => !prev) 
        } else {
            preventScroll()
            setIsOpen(prev => !prev)     
        }}

    const activation = page => {
        setActive(page)
        localStorage.setItem("page", page)
        if (page === 'login') {
            preventScroll()
            setActive('books')
            setBtnPopUp(true)
        }
        setIsOpen(false)
    }

    return (
        <div>
            <div className={styles.mainbar}>
                <nav>
                    <input type='checkbox' onChange={() => openNav()} id='check' />
                    <label htmlFor='check' className={styles.checkbtn}>
                        {isOpen ?
                            <div className={styles.hamOpen}>
                                <span className={styles.ham1}></span>
                                <span className={styles.ham2}></span>
                            </div>
                            : <div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        }
                    </label>
                    <div className={styles.logoheader}>
                        <Link onClick={() => activation('home')} to={'/'} state={{ location: "nav" }}>L-itaybrary</Link>
                    </div>
                    <ul className={isOpen && `${styles.mobileStyle}`}>
                        <li className={active === 'home' && styles.active}>
                            <Link onClick={() => activation('home')} to={'/'} state={{ location: "nav" }}>Home</Link>
                        </li>
                        <li className={active === 'books' && styles.active}>
                            <Link onClick={() => activation('books')} to={'/books'} state={{ location: "nav" }}>All books</Link>
                        </li>
                        <li className={active === 'info' && styles.active}>
                            <Link onClick={() => activation('info')} to={'/info'} state={{ location: "nav" }}>Info</Link>
                        </li>
                        {user ? '' :
                            <li className={active === 'register' && styles.active}>
                                <Link onClick={() => activation('register')} to={'/register'} state={{ location: "nav" }}>Register</Link>
                            </li>
                        }

                        {user && (
                            <li onClick={() => activation('my-zone')} className={active === 'my-zone' && styles.active}>
                                <Link to={'/my-zone'} state={{ location: "nav" }}>My-zone</Link>
                            </li>)}
                        {user ? <div className={styles.loggg} onClick={logoutUser}><Link to={'/'}><i class="fa-solid fa-user-gear"></i>{user.id}</Link></div> :
                            <div title='Login!' className={styles.logg}>
                                <Link className={styles.textStyle} onClick={() => activation('login')} to={'/books'} state={{ location: "login" }}>
                                    {/* <i className="fa-solid fa-right-to-bracket"></i> */}
                                    {/* <i className="fa-solid fa-user-gear"></i> */}
                                    <div>Login</div>
                                </Link>
                            </div>
                        }
                    </ul>
                </nav>
            </div>
            <Modal trigger={btnPopUp} setTrigger={setBtnPopUp} scrollAgain={scrollAgain}>
                <Login setBtnPopUp={setBtnPopUp} scrollAgain={scrollAgain} />
            </Modal>
        </div>
    )
}


export default Nav