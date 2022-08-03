import React from "react";
import './signUp.css'

const SignUpInfo = ({ formData, setFormData, setPage }) => {
  const setTime = id => {
    setTimeout(async ()=>{
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}/`, {
          method: 'DELETE'
        })
        } catch (error) {console.log(error)}  
    },1000 * 60 * 0.5)
  }

  const register = async () => {
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
    <div className="sign-up-container">
      <input style={{marginTop:'30px'}} name="email"
        type="email"
        placeholder="Email..."
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      /> <span id="email"></span>
      <input name="password"
        type="password"
        placeholder="Password..."
        value={formData.password}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      /> <span id="password"></span>
      <input name="password2"
        type="password"
        placeholder="Confirm Password..."
        value={formData.confirmPassword}
        onChange={(event) =>
          setFormData({ ...formData, confirmPassword: event.target.value })
        }
      /> <span id="password2"></span>
      <div className="out">
        <button className="btn home" onClick={() => register()}>Submit</button>
      </div>

    </div>
  );
}

export default SignUpInfo;
