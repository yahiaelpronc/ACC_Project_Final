

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function ListUsers(){

    const [users,setusers]=useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/listusers/")
        .then((res) => setusers(res.data))
        .catch((err)=> console.log(err))

    },[])

    return (<>
           <center> <h1>list of USERS</h1></center>
          {users.map(user=>{
          return <div>
            <h3>{user.username}</h3>
            <h3>{user.email}</h3>
            <Link to={`userdetails/${user.username}`}><button >Details</button></Link>

          </div>
            
          }
            )}

            </>)
}
export default ListUsers