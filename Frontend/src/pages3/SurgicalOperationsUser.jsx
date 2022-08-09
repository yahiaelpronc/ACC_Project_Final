


import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from "react-router-dom";

import { useEffect } from 'react'
import SurgericalResponseDiv from '../components3/SurgicalResponseDiv'
import { useSelector, useDispatch } from 'react-redux'
import '../pages/PagesStatic/NewSchedule.css'
import { useHistory } from "react-router-dom";
import {host_var} from "../vars_react"




function SurgicalOperationsUser() {
    const loggedUser = useSelector((state) => state.loggedUser);
    const [Responses, setResponses] = useState([])
    const [Opartions, setOperations] = useState([])
    const [showdata, setshowdata] = useState("flex")
    const history = useHistory()
    const [showreason, setshowreason] = useState("none")

    const [reason, setReason] = useState("")



    useEffect(() => {
        axios.get(`${host_var}/getSurgicalOperations/${loggedUser.username}/`)
            .then((res) => setOperations(res.data))
            .catch((Err) => console.log(Err))
    }, [])
    const [dateleft, setdateleft] = useState(false)

    const [Declineerr, setDclineErr] = useState()
    const dismissSurgery = async (e) => {
        let id = e.target.id
        let formdata2 = new FormData()
        formdata2.append("statusUser", "declined")
        formdata2.append("reasonUser", reason)
        await axios({
            method: 'POST',
            url: `${host_var}/updateOperationStatusUser/${id}/`,
            data: formdata2
        })
            .then((data) => {
                if (data.data === "you cant decline before 24 hours") {
                    setDclineErr("you cant decline before 24 hours")
                    document.getElementById(`errdeclinePara${e.target.id}`).innerText = "you cant decline before 24 hours"
                }
                else {
                    sendNotification(e.target.name, "surgery")
                    console.log(data.data)
                    setshowdata("none")
                    console.log("done sir")
                    history.push("/")


                }

            }
            )
            .catch((err) => console.log(err))
    }


    const AcceptSurgery = async (e) => {
        let id = e.target.id
        let formdata2 = new FormData()
        formdata2.append("statusUser", "accepted")
        await axios({
            method: 'POST',
            url: `${host_var}/updateOperationStatusUser/${id}/`,
            data: formdata2
        })
            .then((data) => {
                sendNotification(e.target.name, "surgery")
                history.push("/SurgicalOperationsUser")
                console.log(data.data)
                e.target.style.display = "none";
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
            url: `${host_var}/insertNotifications/`,
            data: formField
        }).then((res) => {
            console.log("Notification Sent")
        })
            .catch((err) => console.log(err))
    }
    const submitDecline = (e) => {
        // setshowreason("block")
        // if(showreason === "none"){
        //     setshowreason("block")
        // }else{
        //     setshowreason("none")
        // }
        document.getElementById(`reason${e.target.id}`).style.display = "block"

    }


    const setmyReason = (e) => {
        setReason(e.target.value)
    }
    return (<>
        <div className='bg-light p-3'>
            <div className='row p-2'>
                <img className='col-3 h-25 w-25 rounded' src={require(`./myimages/animalsurgery1.jpg`)} />
                <div className='col-6 '>
                    <h2 className="main-title">Surgical Operations</h2>
                    <h4 className='  my-5 '>See Your Latest schedule For Surgeries</h4>
                </div>
            </div>


            {/* my div */}

            {Opartions.map(opartion => {
                return (<>
                    {opartion.statusUser !== "declined" && (

                        <div className="container-fluid row p-3 border border-secondary my-5 mx-2 rounded" style={{ display: showdata }}>

                            <div className="col-12 p-3 fs-4 text-danger">{opartion.message}</div>

                            <div className="col-6">
                                <div className=" cc card">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor="span22">Animal Name: </label>
                                            <span className="span22">{opartion.animalName}</span>

                                        </li>
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor="">owner Name:</label>
                                            <span className="span22">{opartion.owner}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor=""> vet Name:</label>
                                            <span className="span22">{opartion.vetName} </span>
                                        </li>
                                        {opartion.price !== 0 && (<>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor=""> operation Name:</label>
                                                <span className="span22">{opartion.operationName}</span>

                                            </li>

                                        </>)}


                                    </ul>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className=" cc card">
                                    <ul className="list-group list-group-flush">
                                        {opartion.price !== 0 && (<>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor="span22">price : </label>
                                                <span className="span22">{opartion.price}$</span>

                                            </li>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor="">Date :</label>
                                                <span className="span22">{opartion.date}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <span className="span22 text-danger">Note* : you can't decline before 24 hours </span>
                                            </li>

                                        </>)}

                                        <li className="list-group-item">
                                            <label className="labels" htmlFor="">Vet's Response :</label>
                                            <span className="span22">{opartion.statusVet}</span>
                                        </li>
                                        {(opartion.statusVet === "declined" && opartion.reasonVet !== "") &&
                                            (<>
                                                <li className="list-group-item">
                                                    <label className="labels" htmlFor="">Vet's Reason :</label>
                                                    <span className="span22">{opartion.reasonVet}</span>
                                                </li>
                                            </>)}


                                        <li className="list-group-item" id={`reason${opartion.id}`} style={{ display: "none" }}>
                                            <label className="sp text-danger" htmlFor="">Reason Of Decline:</label>
                                            <input id="reasonInput" placeholder="Reason" type="text" className="inputs" onChange={(e) => setmyReason(e)} required />
                                            <p id={`errdeclinePara${opartion.id}`} className='text-danger'></p>
                                            <div className="d-flex justify-content-end"><button id={opartion.id} name={opartion.vetName} onClick={(e) => dismissSurgery(e)} className="btn btn-danger">Confirm</button></div>
                                        </li>
                                        {/* <li className="list-group-item" style={{display:showreason}}>
                                                <label className="sp text-danger" htmlFor="">Reason Of Decline:</label>
                                                <input placeholder="Reason" type="text" className="inputs" onChange={(e)=>setReason(e.target.value)} value={reason} name='reason' required />
                                                <div  className="d-flex justify-content-end"><button onClick={(e)=>declineStatus(e)} className="btn btn-danger">Submit</button></div>

                                                

                                        </li> */}

                                    </ul>
                                </div>
                                {opartion.statusVet === "declined" ? (<>
                                    <button id={opartion.id} onClick={(e) => submitDecline(e)} className="btn btn-danger mt-5 ms-5 p-2">Decline & Dismiss</button>


                                </>) : (<>
                                    {opartion.price !== 0 &&
                                        <>
                                            {opartion.statusUser !== "accepted" && (<>
                                                <button id={opartion.id} name={opartion.vetName} onClick={(e) => AcceptSurgery(e)} className="btn btn-danger mt-5 ms-5 p-2">Accept</button>
                                            </>)}
                                        </>
                                    }
                                    <button id={opartion.id} onClick={(e) => submitDecline(e)} className="btn btn-danger mt-5 ms-5 p-2">Decline & Dismiss</button>
                                </>)}
                            </div>
                        </div>


                    )}
                </>)
            })}
        </div>
    </>)
}
export default SurgicalOperationsUser