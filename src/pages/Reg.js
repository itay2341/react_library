import React, { useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import VerifyEmail from "../components/VerifyEmail";
import './Reg.css'
import SignUp from "../components/SignUp";


const Reg = () => {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
        name: "",
        phone: "",
        birthDay: "",
        gender:"m"
    });

    const PageDisplay = () => {
        if (page === 0) {
            return <SignUp  formData={formData} setFormData={setFormData} setPage={setPage}/>
        } else if (page === 1) {
            return <VerifyEmail formData={formData} setFormData={setFormData} setPage={setPage} />;
        } else {
            return <PersonalInfo formData={formData} setFormData={setFormData} />;
        }
    };
    return (
        <>
            <div className="form">
                <div className="progressbar">
                    <div
                        style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
                    ></div>
                </div>
                <div className="form-container">
                    <div className="body">{PageDisplay()}</div>
                </div>
            </div>
        </>
    )
}

export default Reg
