import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import '../pages/PagesStatic/NewSchedule.css'
import {host_var} from "../vars_react"




function ServicesResponsesDiv(props) {
    const [showdata, setshowdata] = useState("flex")
    const [showreason, setshowreason] = useState("none")
    const [reason, setReason] = useState("")




    const declineStatus = async () => {
        let formdata2 = new FormData()
        formdata2.append("statusUser", "declined")
        formdata2.append("reasonUser", reason)
        await axios({
            method: 'POST',
            url: `${host_var}/api/updateSrviceStatusUser/${props.id}/`,
            data: formdata2
        })
            .then((data) => {
                // history.push("/")
                sendNotification(props.locationOwner, "service")
                console.log(data.data)
                setshowdata("none")
                console.log("done sir")
            }
            )
            .catch((err) => console.log(err))
    }
    const acceptStatus = async (e) => {
        let formdata2 = new FormData()
        formdata2.append("statusUser", "accepted")
        await axios({
            method: 'POST',
            url: `${host_var}/api/updateSrviceStatusUser/${props.id}/`,
            data: formdata2
        })
            .then((data) => {
                // history.push("/")
                sendNotification(props.locationOwner, "service")
                e.target.style.display = "none"
                console.log(data.data)
                console.log("done sir")
            })
            .catch((err) => console.log(err))
    }
    const sendNotification = async (username, type) => {
        let formField = new FormData()
        formField.append("receiver", username)
        formField.append("type", type)
        await axios({
            method: 'POST',
            url: `${host_var}/api/insertNotifications/`,
            data: formField
        }).then((res) => {
            console.log("Notification Sent")
        })
            .catch((err) => console.log(err))
    }

    const submitDecline =(e)=>{
        setshowreason("block")

    }

  

    const dateday=props.date.split("-")[2]
    const dateMonth=props.date.split("-")[1]
    const dateYear=props.date.split("-")[0]
    
    
    const mytoday=new Date()

    const todayYear=mytoday.getFullYear()
    const todayMonth=mytoday.getMonth()+1
    const todayDay=mytoday.getDate()

    const dayDiff=dateday-todayDay
    const MonthDiff=dateMonth-todayMonth
    const yearDiff=dateYear-todayYear
    console.log("our date today",dayDiff)
    console.log("our date month today",MonthDiff)
    console.log("our date Year today",yearDiff)
    const [DateDiff,setDateDiff]=useState()

    // if(dayDiff > 0 | MonthDiff > 0 | yearDiff > 0){
    //     console.log("yessssssssssssssssssssssss")
    //     setDateDiff(true)
    // }


    return (<>
            {(props.statusUser !== "declined" && (yearDiff > 0 || (MonthDiff > 0 && yearDiff == 0 ) || (yearDiff == 0 && MonthDiff == 0 && dayDiff > 0) )  )  &&  (<>





        <div className="container-fluid row p-3 border border-secondary my-5 mx-2 rounded" style={{ display: showdata }}>
            <div className="col-6">
                <div className=" cc card">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <label className="labels" htmlFor="span22">Animal Type: </label>
                            <span className="span22">{props.AnimalType}</span>

                        </li>
                        <li className="list-group-item">
                            <label className="labels" htmlFor="">location owner :</label>
                            <span className="span22">{props.locationOwner}</span>
                        </li>
                        <li className="list-group-item">
                            <label className="labels" htmlFor="">service Name:</label>
                            <span className="span22">{props.serviceName}</span>
                        </li>
                        <li className="list-group-item">
                            <label className="labels" htmlFor=""> location Name:</label>
                            <span className="span22">{props.locationName}</span>
                        </li>


                    </ul>
                </div>
            </div>


            <div className="col-6">
                <div className=" cc card">
                    <ul className="list-group list-group-flush">


                        <li className="list-group-item">
                            <label className="labels" htmlFor="">Owner status  :</label>
                            <span className="span22">{props.statusOwner}</span>
                        </li>
                        {props.statusOwner === "declined" &&(<>
                                                <li className="list-group-item">
                                                    <label className="labels" htmlFor=""> Owner Reason :</label>
                                                    <span className="span22">{props.reasonVet} </span>
                                                </li>


                        </>)}
                        <li className="list-group-item">
                            <label className="labels" htmlFor=""> Date:</label>
                            <span className="span22">{props.date}</span>

                        </li>
                        <li className="list-group-item">
                    
                            <span className="span22  text-danger">note* : you cant decline before 24 hours</span>

                        </li>
                        <li className="list-group-item">
                            <label className="labels" htmlFor=""> Time:</label>
                            <span className="span22">{props.time} {props.timePeriod}</span>

                        </li>
                        <li className="list-group-item">
                            <label className="labels" htmlFor=""> Price:</label>
                            <span className="span22">{props.price}$</span>

                        </li>
                        <li className="list-group-item" style={{display:showreason}}>
                                                <label className="sp text-danger" htmlFor="">Reason Of Decline:</label>
                                                <input placeholder="Reason" type="text" className="inputs" onChange={(e)=>setReason(e.target.value)} value={reason} name='reason' required />
                                                <div  className="d-flex justify-content-end"><button onClick={(e)=>declineStatus(e)} className="btn btn-danger">Confirm</button></div>

                                                

                        </li>

                    </ul>
                </div>
                <div className='my-4 p-2'>
                    {props.statusUser !== "accepted" &&
                        <button onClick={(e) => acceptStatus(e)} className='btn btn-danger mx-2'>Accept</button>
                        }
                        <button onClick={(e) => submitDecline(e)} disabled={dayDiff <= 1 && MonthDiff <= 0 && yearDiff <=0} className='btn btn-danger mx-2'>decline</button>

                    {/* {(dayDiff > 0 | MonthDiff > 0 | yearDiff > 0 ) && (

                    )} */}
                  
                </div>
            </div>
        </div>
        </>)}



















    </>)
}
export default ServicesResponsesDiv