import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import '../pages/PagesStatic/NewSchedule.css'




function ServicesRequestsDiv(props) {
    const [showdata, setshowdata] = useState("flex")
    const [showreason, setshowreason] = useState("none")
    const [reason, setReason] = useState("")


    const acceptStatus = async (e) => {
        let formdata2 = new FormData()
        formdata2.append("statusOwner", "accepted")
        await axios({
            method: 'POST',
            url: `http://localhost:8000/api/updateSrviceStatusOwner/${props.id}/`,
            data: formdata2
        })
            .then((data) => {
                // history.push("/")
                sendNotification(props.animalOwner, "service")
                e.target.style.display = "none"
                console.log(data.data)
                console.log("done sir")
            })
            .catch((err) => console.log(err))
    }

    const declineStatus = async () => {

        let formdata2 = new FormData()
        formdata2.append("statusOwner", "declined")
        formdata2.append("reasonVet", reason)
        await axios({
            method: 'POST',
            url: `http://localhost:8000/api/updateSrviceStatusOwner/${props.id}/`,
            data: formdata2
        })
            .then((data) => {
                sendNotification(props.animalOwner, "service")
                // history.push("/")
                console.log(data.data)
                setshowdata("none")
                console.log("done sir")
            }

            )
            .catch((err) => console.log(err))
    }

    const sendNotification = async (username, type) => {
        let formField = new FormData()
        formField.append("receiver", username)
        formField.append("type", type)
        await axios({
            method: 'POST',
            url: 'http://localhost:8000/api/insertNotifications/',
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
    const todayDay=mytoday.getDay()

    const dayDiff=dateday-todayDay
    const MonthDiff=dateMonth-todayMonth
    const yearDiff=dateYear-todayYear
    console.log("our date today",dayDiff)
    console.log("our date month today",MonthDiff)
    console.log("our date Year today",yearDiff)
    const [DateDiff,setDateDiff]=useState()
    return (<>
        {(props.statusOwner !== "declined" && (yearDiff > 0 || (MonthDiff > 0 && yearDiff == 0 ) || (yearDiff == 0 && MonthDiff == 0 && dayDiff > 0) )  )&& (<>

            <div className="container-fluid row p-3 border border-secondary my-5 mx-2 rounded" style={{ display: showdata }}>

                {/* <div className="col-12 p-3 fs-4 text-danger">{sur.message}</div> */}

                <div className="col-6">
                    <div className=" cc card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <label className="labels" htmlFor="span22">Animal Type: </label>
                                <span className="span22">{props.AnimalType}</span>

                            </li>
                            <li className="list-group-item">
                                <label className="labels" htmlFor="">Animal Owner:</label>
                                <span className="span22">{props.animalOwner}</span>
                            </li>
                            <li className="list-group-item">
                                <label className="labels" htmlFor="">service Name:</label>
                                <span className="span22">{props.serviceName}</span>
                            </li>


                        </ul>
                    </div>
                </div>


                <div className="col-6">
                    <div className=" cc card">
                        <ul className="list-group list-group-flush">


                            <li className="list-group-item">
                                <label className="labels" htmlFor="">User status  :</label>
                                <span className="span22">{props.statusUser}</span>
                            </li>
                            {props.statusUser === "declined" &&(<>
                                                <li className="list-group-item">
                                                    <label className="labels" htmlFor=""> User Reason :</label>
                                                    <span className="span22">{props.reasonUser} </span>
                                                </li>
             


                            </>)}
                            <li className="list-group-item">
                                <label className="labels" htmlFor=""> Date :</label>
                                <span className="span22">{props.date}</span>

                            </li>
                            <li className="list-group-item">
                    
                                <span className="span22  text-danger">note* : you cant decline before 24 hours</span>

                            </li>
                            <li className="list-group-item">
                                <label className="labels" htmlFor=""> Time :</label>
                                <span className="span22">{props.time} {props.timePeriod}</span>

                            </li>
                            <li className="list-group-item" style={{display:showreason}}>
                                                <label className="sp text-danger" htmlFor="">Reason Of Decline:</label>
                                                <input placeholder="Reason" type="text" className="inputs" onChange={(e)=>setReason(e.target.value)} value={reason} name='reason' required />
                                                <div  className="d-flex justify-content-end"><button onClick={(e)=>declineStatus(e)}  className="btn btn-danger">Confirm</button></div>

                            </li>

                        </ul>
                    </div>
                    <div className='my-4 p-2'>
                        {props.statusOwner !== "accepted" &&
                            <button onClick={(e) => acceptStatus(e)} className='btn btn-danger mx-2'>Accept</button>
                        }


                        <button onClick={(e) => submitDecline(e)} disabled={dayDiff <= 1 && MonthDiff <= 0 && yearDiff <=0} className='btn btn-danger mx-2'>decline</button>



                    </div>
                </div>
            </div>

        </>)}




    </>)
}
export default ServicesRequestsDiv