import './PagesStatic/Login.css'
import React from 'react'
import './PagesStatic/LoginAsVet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
import './PagesStatic/EmergencyCSS.css';
import { useSelector, useDispatch } from 'react-redux'
import { changeUser, changeVet, changeLogged, changeLoggedType } from '../store/actions/action'
import axios from 'axios'
import { useState, useEffect } from 'react'
function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [resend, setResend] = useState(false)
    const [submitErr, setSubmitErr] = useState("")
    const [resendErr, setResendErr] = useState("")
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            loginUser(e)
        }
    }
    const loginUser = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:8000/api/loginVet/${username}/${password}`)
            .then((res) => {
                if (res.data === "Incorrect Credintials") {
                    setSubmitErr(res.data)
                }
                else if (res.data === "Please Activate Your Account") {
                    setResend(true)
                    setSubmitErr(res.data)
                }
                else {
                    console.log(res.data)
                    dispatch(changeUser(res.data))
                    dispatch(changeLogged(true))
                    dispatch(changeLoggedType("vet"))
                    history.push("/")
                }
            }
            )
            .catch((err) => console.log(err))
    }
    function changeData(e) {
        if (e.target.name === "username") {
            setUsername(e.target.value)
            if (e.target.value.length < 3 || e.target.value.length > 30) {
                setUsernameErr("Username Has To Be 3-30 Characters Long")
                document.getElementById("submitButton").disabled = true
            } else {
                setUsernameErr("")
                document.getElementById("submitButton").disabled = false
            }
        }
        else {
            setPassword(e.target.value)
            if (e.target.value.length < 3 || e.target.value.length > 30) {
                setPasswordErr("Password Has To Be 3-30 Characters Long")
                document.getElementById("submitButton").disabled = true
            } else {
                setPasswordErr("")
                document.getElementById("submitButton").disabled = false
            }
        }
    }
    function resendEmail(e) {
        axios.get(`http://localhost:8000/api/resendEmail/${username}`)
            .then((res) => {
                console.log(res.data)
                if (res.data === "Email Sent") {
                    setResend(false)
                    setSubmitErr("")
                    setResendErr(res.data)
                }
            }
            )
            .catch((err) => console.log(err))
    }
    return <>
        <div className="maxbox">
            <div className="mybooox">
                <div className="my2i2le">
                    <Link id="login" style={{color:"white"}} className="my2i2le" to="#login">login</Link>
                    {/* <Link id="signup" to=".registerVet/.registervet.html">Register as Vet</Link>
                    <Link id="signup" to=".register/.Register/.contact.html">Register as User</Link> */}
                </div>
                <div id="errorMsg"></div>
                <div className="contentbooox">
                    <div className="logiiin" >
                        <div className="myinf000">
                            <label for="logName" className='req'>Username *</label>
                            <input type="text" className='ansser' name="username" id="logName" placeholder="username" onChange={(e) => changeData(e)} onKeyDown={(e) => handleKeyDown(e)} />
                            <p className="text-danger" style={{ fontSize: "15px" }}>{usernameErr}</p>
                        </div>
                        <div className="myinf000">
                            <label for="logPassword" className='req'>Password *</label>
                            <input type="password" className='ansser' name="password" id="logPassword" placeholder="password" onChange={(e) => changeData(e)} onKeyDown={(e) => handleKeyDown(e)} />
                            <p className="text-danger" style={{ fontSize: "15px" }}>{passwordErr}</p>
                        </div>
                        {/* <div id="check" className='remmbermeee'>
                            <input type="checkbox" id="remember" className='checkmeee' />
                            <label for="remember" className="mylabel">Remember me</label>
                        </div> */}
                        <br /><br />
                        <p className="text-danger" style={{ fontSize: "17px" }}>{submitErr}
                            {resend &&
                                <Link onClick={(e) => resendEmail(e)}>  Resend Email</Link>
                            }
                        </p>
                        <p className="text-success" style={{ fontSize: "17px" }}><strong>{resendErr}</strong></p>
                        <input type="submit" value="Login" id="submitButton" onClick={(e) => loginUser(e)} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login;