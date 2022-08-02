


import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from "react-router-dom";

import { useEffect } from 'react'
import SurgericalResponseDiv from '../components3/SurgicalResponseDiv'
import { useSelector, useDispatch } from 'react-redux'
import '../pages/PagesStatic/NewSchedule.css'
import { useHistory } from "react-router-dom";




function SurgicalOperationsUser() {
    const loggedUser = useSelector((state) => state.loggedUser);
    const [Responses, setResponses] = useState([])
    const [Opartions, setOperations] = useState([])
    const [showdata, setshowdata] = useState("flex")
    const [disapear, setdisapear] = useState("flex")
    const history = useHistory()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/getSurgicalOperations/${loggedUser.username}/`)
            .then((res) => setOperations(res.data))
            .catch((Err) => console.log(Err))
    }, [])

    const dismissSurgery = async (e) => {
        let id = e.target.id
        let formdata2 = new FormData()
        formdata2.append("statusUser", "declined")
        await axios({
            method: 'POST',
            url: `http://localhost:8000/api/updateOperationStatusUser/${id}/`,
            data: formdata2
        })
            .then((data) => {
                // history.push("/SurgicalOperationsUser")
                sendNotification(e.target.name, "surgery")
                console.log(data.data)
                setshowdata("none")
                console.log("done sir")
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
            url: `http://localhost:8000/api/updateOperationStatusUser/${id}/`,
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
            url: 'http://localhost:8000/api/insertNotifications/',
            data: formField
        }).then((res) => {
            console.log("Notification Sent")
        })
            .catch((err) => console.log(err))
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
                                        {opartion.statusVet !== "declined" && (<>
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
                                        {opartion.statusVet !== "declined" && (<>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor="span22">price : </label>
                                                <span className="span22">{opartion.price}$</span>

                                            </li>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor="">Date :</label>
                                                <span className="span22">{opartion.date}</span>
                                            </li>

                                        </>)}

                                        <li className="list-group-item">
                                            <label className="labels" htmlFor="">Vet's Response :</label>
                                            <span className="span22">{opartion.statusVet}</span>
                                        </li>

                                    </ul>
                                </div>
                                {opartion.statusVet === "declined" ? (<>
                                    <button id={opartion.id} name={opartion.vetName} onClick={(e) => dismissSurgery(e)} className="btn btn-danger mt-5 ms-5 p-2">Decline & Dismiss</button>
                                    {/* <button className="btn btn-danger mt-5 ms-4 px-3 py-2">Chat</button> */}

                                </>) : (<>
                                    {opartion.price !== 0 &&
                                        <>
                                            {opartion.statusUser !== "accepted" && (<>
                                                <button id={opartion.id} name={opartion.vetName} onClick={(e) => AcceptSurgery(e)} className="btn btn-danger mt-5 ms-5 p-2">Accept</button>
                                            </>)}
                                        </>
                                    }



                                    <button id={opartion.id} name={opartion.vetName} onClick={(e) => dismissSurgery(e)} className="btn btn-danger mt-5 ms-5 p-2">Decline & Dismiss</button>
                                    {/* <button className="btn btn-danger mt-5 ms-4 px-3 py-2">Chat</button> */}
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