import React from 'react'
import axios from 'axios'
import './PagesStatic/MedicationAdmin2.css';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeUser, changeVet, changeLogged, changeLoggedType, changeCurrentUser } from '../store/actions/action'
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import {host_var} from "../vars_react"

function Notverified() {
    return (<>
        <div className='MAXcontainerr'>
            <h2 className='main-title'>Not Verified</h2>
            <div className='my-3 p-3'>
                <h4 className='text-danger'><strong>Verification Failed , Please Try Logging in And Resending Email.</strong></h4>
            </div>
            <div className='d-flex justify-content-end me-4 my-2 p-2'>
                <Link className='buttoooon' to="/login"><button className='buttoooon '>Login</button></Link>
            </div>
        </div>
    </>
    )
}
export default Notverified