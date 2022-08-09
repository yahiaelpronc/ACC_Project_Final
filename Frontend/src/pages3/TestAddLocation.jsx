import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {host_var} from "../vars_react"
function TestAddLocation() {
    // ${host_var}/task-list/
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        address: "",
        mobile: "",
        website_link: "",
        picture: "",
        work_hours_start: 0,
        work_hours_start_period: "",
        work_hours_end: "",
        work_hours_end_period: 0,
    })
    const [users, setUsers] = useState([])
    const [picName, setPicName] = useState("")

    const changeData = (e) => {
        if (e.target.name === "name") {
            setUserData({
                ...userData,
                name: e.target.value,
            })
        }
        else if (e.target.name === "email") {
            setUserData({
                ...userData,
                email: e.target.value,
            })
        }
        else if (e.target.name === "address") {
            setUserData({
                ...userData,
                address: e.target.value,
            })
        }
        else if (e.target.name === "mobile") {
            setUserData({
                ...userData,
                mobile: e.target.value,
            })
        }
        else if (e.target.name === "website_link") {
            setUserData({
                ...userData,
                website_link: e.target.value,
            })
        }
        else if (e.target.name === "picture") {
            setUserData({
                ...userData,
                picture: e.target.value,
            })
            let pic_name = e.target.value.split("\\")[2]
            setPicName({
                picName: pic_name
            })
        }
        else if (e.target.name === "work_hours_start") {
            setUserData({
                ...userData,
                work_hours_start: e.target.value,
            })
        }
        else if (e.target.name === "work_hours_start_period") {
            setUserData({
                ...userData,
                work_hours_start_period: e.target.value,
            })
        }
        else if (e.target.name === "work_hours_end") {
            setUserData({
                ...userData,
                work_hours_end: e.target.value,
            })
        }
        else {
            setUserData({
                ...userData,
                work_hours_end_period: e.target.value,
            })
        }
    }
    const submitData = (e) => {
        e.preventDefault()
    }
    console.log(picName)
    return (
        <>
            <input className="form-control" type="text" name="name" onChange={(e) => changeData(e)} placeholder="name" value={userData.name} />
            <input className="form-control" type="text" name="email" onChange={(e) => changeData(e)} placeholder="email" value={userData.email} />
            <input className="form-control" type="text" name="address" onChange={(e) => changeData(e)} placeholder="address" value={userData.address} />
            <input className="form-control" type="text" name="mobile" onChange={(e) => changeData(e)} placeholder="mobile" value={userData.mobile} />
            <input className="form-control" type="text" name="website_link" onChange={(e) => changeData(e)} placeholder="website link" value={userData.website_link} />
            <input className="form-control" type="file" name="picture" onChange={(e) => changeData(e)} placeholder="picture" value={userData.picture} />
            <input className="form-control" type="number" name="work_hours_start" onChange={(e) => changeData(e)} placeholder="work hours start" value={userData.work_hours_start} />
            <select className="form-select my-4 p-2" aria-label="Default select example" name="work_hours_start_period" onChange={(e) => changeData(e)} value={userData.work_hours_start_period}>
                <option value="">Period of Start Work</option>
                <option value="pm">PM</option>
                <option value="am">AM</option>
            </select>
            <input className="form-control" type="number" name="work_hours_end" onChange={(e) => changeData(e)} placeholder="work hours end" value={userData.work_hours_end} />
            <select className="form-select my-4 p-2" aria-label="Default select example" name="work_hours_end_period" onChange={(e) => changeData(e)} value={userData.work_hours_end_period}>
                <option value="">Period of End Work</option>
                <option value="pm">PM</option>
                <option value="am">AM</option>
            </select>



            <button className="btn btn-primary">Submit</button>
        </>
    )
}

export default TestAddLocation