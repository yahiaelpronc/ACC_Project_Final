import { useEffect, useState } from "react"
import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import img1 from "../pages3/myimages/avatar-02.png"
// import img2 from "../../../ACCDjango/media/profileImages/profileImages/avatar-05.png"
import {host_var} from "../vars_react"

function VetDetails(){
    const myparams=useParams()
    const [vet,setvet]=useState({})

    useEffect(()=>{
        axios.get(`${host_var}/api/findvet/${myparams.username}`)
        .then((res)=> console.log(res.data))
        .catch((err)=> console.log(err))

    },[])


    return(<>
               <center> <h1>Details of vet</h1></center>
           <center> <h1>{vet.firstname}</h1></center>
           <center> <h1>{vet.email}</h1></center>
           {/* <img src={img2}/> */}
           {/* <img src="D:\programming\ITI\im8.png" alt="vet"/> */}
           {/* <img src="D:/programming/ITI/FinalProject22/ACCDjango/media/profileImages/avatar-06.png" alt="vet"/> */}
        </>)
}
export default VetDetails