

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function ListVets(){

    const [Vets,setvets]=useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/listvets/")
        .then((res) => setvets(res.data))
        .catch((err)=> console.log(err))

    },[])

    return (<>
           <center> <h1>list of USERS</h1></center>
          {Vets.map(vet=>{
          return <div>
            <h3>{vet.username}</h3>
            <h3>{vet.email}</h3>
            <Link to={`vetdetails/${vet.username}`}><button >Details</button></Link>

          </div>
            
          }
            )}

            </>)
}
export default ListVets