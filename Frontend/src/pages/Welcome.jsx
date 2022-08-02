import React from 'react'
import axios from 'axios'
import './PagesStatic/MedicationAdmin2.css';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeUser, changeVet, changeLogged, changeLoggedType, changeCurrentUser } from '../store/actions/action'
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";

function Welcome() {
    return (<>
        <div className='MAXcontainerr'>
            <h2 className='main-title'>Welcome To ACC</h2>
            <div className='my-3 p-3'>
                <h4 className='text-success'><strong>Your Account Has Been Created , And A Verification Email Has Been Sent , Please Verify And Login</strong></h4>
            </div>
            <div className='d-flex justify-content-end me-4 my-2 p-2'>
                <Link className='buttoooon' to="/login"><button className='buttoooon'>Login</button></Link>
            </div>
        </div>
    </>
    )
}
export default Welcome