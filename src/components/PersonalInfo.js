import React from "react";
import styles from './PersonalInfo.module.scss'
import AuthContext from '../context/AuthContext'
import { useContext, useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const PersonalInfo = ({ formData, setFormData }) => {
const [dateSelected, setDateSelected] = useState(null)
  const {token} = useContext(AuthContext)

  const updateDate = date => {
    setDateSelected(date)
    setFormData(prev => {
      return {...prev, birthDay:date}
    })
  }
  const lastStepRegister = async e => {
    e.preventDefault()
    // const el = document.querySelector('#error')
    // el.style.opacity = "0"
    let bodyToRequest = {}
    if (formData.phone==='' && formData.birthDay===''){
      bodyToRequest = {"name": formData.name,"gender": formData.gender}
    } else if (formData.phone!=='' && formData.birthDay===''){
      bodyToRequest = { "name": formData.name, "phone": formData.phone, "gender": formData.gender }
    } else if (formData.phone==='' && formData.birthDay!==''){
      bodyToRequest = { "name": formData.name, "gender": formData.gender, "birth_day":formData.birthDay } 
    } else {bodyToRequest =  { "name": formData.name, "phone": formData.phone, "gender": formData.gender, "birth_day":formData.birthDay }} 
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/update/", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
                   "Authorization": `Bearer ${token.access}` },
        body: JSON.stringify(bodyToRequest)
      })
      // const data = await response.json()
      if (response.status === 200) {
    
        console.log('success')
      } else {
        // const el = document.querySelector('#error')
        // el.style.opacity = "1"
        console.log('not 200')
      }
    } catch (error) { console.log(error) }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowB}>
        <h4>Personal details</h4>
        </div>
        <form onSubmit={(e)=>lastStepRegister(e)}>
          <div className={styles.row}>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
              <input type="text" placeholder="Full Name" name="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <div className={styles.input_icon}><i className="fa fa-user"></i></div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
            <input type="text" placeholder="Phone Number" name="phone"
              value={formData.phone}
              onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              }}
              />
              <div className={styles.input_icon}><i class="fa-solid fa-phone"></i></div>
            </div>
          </div>
          <div className={styles.rowB}>
          Date of birth
          </div>
          <div className={styles.row}>
            <DatePicker selected={dateSelected} onChange={date=>updateDate(date)}
            dateFormat='dd/MM/yyyy' maxDate={new Date()} isClearable
            showYearDropdown scrollableYearDropdown
            />
            </div>
          <div className={`${styles.row} pt-3`}>
              <div className={`${styles.input_group}`}>
                <input id="gender-male" type="radio" name="gender"/>
                <label className={`${styles.gender}`} onClick={()=>{
                  setFormData({...formData, gender:"m"})
                }} htmlFor="gender-male">Male</label>
                <input id="gender-female" type="radio" name="gender"/>
                <label className={`${styles.gender}`} onClick={()=>{
                  setFormData({...formData, gender:"f"})
                }} htmlFor="gender-female">Female</label>
              </div>
              <button className={styles.btn} type="submit">Confirm & start reading</button>
            </div>
        </form>
      </div>
    </>

  );
}

export default PersonalInfo;
