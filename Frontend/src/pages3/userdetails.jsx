import { useEffect, useState } from "react"
import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import {host_var} from "../vars_react"


function UserDetails(){
    const myparams=useParams()
    const [user,setuser]=useState({})

    useEffect(()=>{
        axios.get(`${host_var}/api/finduser/${myparams.username}`)
        .then((res)=> setuser(res.data))
        .catch((err)=> console.log(err))

    },[])


    return(<>
               <center> <h1>Details of locations</h1></center>
           <center> <h1>{user.firstname}</h1></center>
           <center> <h1>{user.email}</h1></center>
        </>)
}
export default UserDetails