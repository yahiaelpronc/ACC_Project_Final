import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {host_var} from "../vars_react"
function ListUsers() {
    // ${host_var}/task-list/
    const [userData, setUserData] = useState({
        username: "",
        willDelete: false,
        displayAll: true,
    })
    const [users, setUsers] = useState([])

    const changeData = (e) => {
        if (e.target.name === "fetch") {
            setUserData({
                ...userData,
                username: e.target.value,
                displayAll: false
            })
        } else {
            setUserData({
                ...userData,
                username: e.target.value,
                willDelete: true,
            })
        }
    }
    const submitData = (e) => {
        e.preventDefault()
        if (userData.willDelete) {
            axios.delete(`${host_var}/users-delete/` + userData.username)
                .then((res) => setUsers(res.data))
                .catch((err) => console.log(err))
        } else if (userData.displayAll) {
            axios.get(`${host_var}/users-list/`)
                .then((res) => setUsers(res.data))
                .catch((err) => console.log(err))
        } else {
            axios.get(`${host_var}/users-list/` + userData.username)
                .then((res) => setUsers(res.data))
                .catch((err) => console.log(err))
        }
    }
    console.log(users)
    return (
        <>
            <form onSubmit={(e) => submitData(e)}>
                <input className="form-control" type="text" name="fetch" onChange={(e) => changeData(e)} />
                <button className="btn btn-primary">Fetch User</button>
                <input className="form-control" type="text" name="delete" onChange={(e) => changeData(e)} />
                <button className="btn btn-danger">Delete User</button>
            </form>
            <h4>{users.username}</h4>
            <h4>{users.email}</h4>
            <h4>{users.profile_pic}</h4>
            {/* <img src={users.profile_pic.split("/")[2]} alt="" /> */}
            {/* LOOP ON ARRAY */}
            {userData.displayAll &&
                // If True Only
                (users.map(user => {
                    return <li key={user.id}>{user.username}</li>
                })
                )
            }
        </>
    )
}

export default ListUsers