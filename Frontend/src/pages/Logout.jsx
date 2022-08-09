import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { changeUser, changeVet, changeLogged, changeLoggedType, changeCurrentUser } from '../store/actions/action'
import {host_var} from "../vars_react"
function Logout() {
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.loggedUser);
    const history = useHistory()
    useEffect(() => {
        axios.get(`${host_var}/logout/${loggedUser.username}`)
            .then((res) => {
                console.log(res.data)
                dispatch(changeUser([]))
                dispatch(changeLogged(false))
                dispatch(changeLoggedType(""))
                dispatch(changeCurrentUser(""))
                dispatch(changeVet([]))
                history.push("/")
            }
            )
            .catch((err) => console.log(err))
    }, [])
}
export default Logout;