import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function LocationDetails(){


    const myid=useParams()
    const [details,setdetails]=useState({})
    useEffect((id)=>{

        axios.get(`http://127.0.0.1:8000/api/locationDetails/${myid.id}`)
        .then((res)=>setdetails(res.data))
        .catch((err)=> console.log(err))
    },[])



    return(<>
           <center> <h1>Details of locations</h1></center>
           <center> <h1>{details.name}</h1></center>
           <center> <h1>{details.email}</h1></center>
           

        </>)
}
export default LocationDetails