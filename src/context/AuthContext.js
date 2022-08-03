import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import { createContext, useState, useEffect } from "react";
const AuthContext = createContext({})
export default AuthContext;


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(()=> localStorage.getItem('AuthToken') ? JSON.parse(localStorage.getItem('AuthToken')) : null)
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(localStorage.getItem('page') ? localStorage.getItem('page') : 'home')
    const navigate = useNavigate()

    const returnBook = async id => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/loans/${id}/`, {
                method: 'PUT',
                headers: { "Authorization": `Bearer ${token.access}` }
            })
            const data = await response.json()
            if (response.status === 200) {
                setUser(prev=>{
                    return {
                        ...prev,
                        active_loans:[
                            ...prev.active_loans.filter(i=>i.id)
                        
                        ],
                        history_loans:[]
                    }
                })
            } else {logoutUser()}
        } catch(error){console.log(error)}
    }

    const updateToken = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({'refresh':token?.refresh})
            })
            const data = await response.json()
            if (response.status === 200) {
                setToken(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem("AuthToken", JSON.stringify(data))
            } else {logoutUser()}
            if (loading){
                setLoading(false)
            }
        } catch(error){console.log(error)}
    }

    const loanBook = async id => {
        try {
            const response = await fetch("http://127.0.0.1:8000/loans/", {
                method: 'POST',
                headers: { "Authorization": `Bearer ${token.access}` },
                body: JSON.stringify({ "book_id": id })
            })
            const data = await response.json()
            console.log(response)
            console.log(data)
            if (response.status === 200) {
                if (data.massage === 'user already took this book...')
                navigate('/my-zone',{
                    state:{
                        location:"loan the same book"
                    }
                })            
            } else {logoutUser()}
        } catch (error) { console.log(error) }
    }

    const getLoans = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/loans/", {
                method: 'GET',
                headers: { "Authorization": `Bearer ${token.access}` }
            })
            const data = await response.json()
            if (response.status === 200) {
                setUser(prev => {
                    return {
                        ...prev,
                        active_loans: data.active_loans,
                        history_loans: data.history_loans
                    }
                })

            } else {logoutUser()}
        } catch (error) { console.log(error) }
    }

    const loginUser = async e => {
        e.preventDefault()
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "email": e.target.email.value, "password": e.target.password.value })
            })
            const data = await response.json()
            if (response.status === 200) {
                setToken(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem("AuthToken", JSON.stringify(data))
            } else {
                alert("you don't have an access")
            }
        } catch (error) { console.log(error) }
    }

    const logoutUser = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem("AuthToken")
        setActive('home')
        navigate('/',{
            state:{
                location:"logout"
            }
        })
    }

    const getBooks = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/books/", { method: 'GET' })
            const data = await response.json()
            console.log(data) //books
            console.log(response) //all the response data
            if (response.status === 200) {
                setBooks(data.books)
                console.log('success')
            } else {
                alert("the request is not good")
            }
        } catch (error) { console.log(error) }
    }
    
    const preventScroll = () => {
        const b = document.querySelector('body')
        b.style.height = '100%'
        b.style.overflow = 'hidden'
    }
    const scrollAgain = () => {
        const b = document.querySelector('body')
        b.style.overflow = 'scroll'
    }

    useEffect(()=>{
        if (loading) {
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4 + 1000 * 5
        let interval = setInterval(()=>{
            if (token) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    },[token,loading])

    const context = {
        user, token, setUser, setToken,
        loginUser, logoutUser,
        books, getBooks, loanBook,
        getLoans, active, setActive,
        preventScroll, scrollAgain
    }
    return (
        <AuthContext.Provider value={context} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
