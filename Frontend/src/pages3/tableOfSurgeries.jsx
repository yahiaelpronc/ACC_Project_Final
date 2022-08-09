// import './PagesStatic/Operations.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Table from '../Components/ClassTable';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useHistory } from "react-router-dom";

import '../pages/PagesStatic/NewSchedule.css'

import axios from 'axios';
import { changeUser, changeVet, changeLogged, changeLoggedType } from '../store/actions/action'
import {host_var} from "../vars_react"


function TableOfSurgries() {
    const history=useHistory()

    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.loggedUser);
    const currentVet = useSelector((state) => state.currentVet);
    const [Surgeries, setSurgries] = useState([])
    const [Medication, setMedication] = useState([])
    const [Animals, setAnimals] = useState([])
    const [Weights, setWeights] = useState([])
    const [genders, setGenders] = useState([])
    const [Species, setSpecies] = useState([])
    const [b_date, setbdate] = useState([])
    const [length, setlength] = useState([])
    const [Finished, setFinished] = useState(true)
    const [dataCame, setDataCame] = useState(false)
    const [showreason, setshowreason] = useState("none")
    const [reason, setReason] = useState("")
    const [declineErr, setDeclineErr] = useState()



    var WeightArr = []
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    useEffect(() => {
        axios.get(`${host_var}/api/getSurgery/${loggedUser.username}/`)
            .then((res) => {
                setSurgries(res.data)
                console.log("Surgery Res Data : ", res.data)
                setlength(res.data.length)
            })
            .catch((err) => console.log(err))
    }, [])



    if (Surgeries.length > 0 && Finished) {
        for (let i = 0; i < length; i++) {
            axios.get(`${host_var}/api/findSpecificAnimal/${Surgeries[i].animalName}/`)
                .then((res) => {
                    setWeights(current => [...current, res.data.weight]);
                    setSpecies(current => [...current, res.data.species]);
                    setbdate(current => [...current, res.data.b_date]);
                    setGenders(current => [...current, res.data.gender]);
                })
                .catch((err) => console.log(err))
        }

        setFinished(false)
    }
    console.log("Weights Res Data : ", Weights)

    const [agedata, setagedata] = useState([])
    const getAge = () => {
        const mydate = new Date()
        const myYear = mydate.getFullYear()

        const animalB_Date = b_date
        const myarr = animalB_Date.split("-")
        console.log("my arr", myarr)


        const AnimalAgeY = myYear - (myarr[0])
        const AnimalAgeM = mydate.getMonth() - (myarr[1])
        const AnimalAgeD = mydate.getDay() - (myarr[2])
        console.log(myarr)
        console.log(myYear)
        console.log("birth date", animalB_Date)
        setagedata(AnimalAgeY + " years " + AnimalAgeM + "months " + AnimalAgeD + " days ")


    }
    const [showdata, setshowdata] = useState("flex")
    const [dateleft, setdateleft] = useState(false)

    const dismissSurgery = async (e) => {
        let id = e.target.id
        let formdata2 = new FormData()
        formdata2.append("statusVet", "declined")
        formdata2.append("reasonVet", reason)

        await axios({
            method: 'POST',
            url: `${host_var}/api/updateOperationStatusVet/${id}/`,
            data: formdata2
        })
            .then((data) => {
                if (data.data === "you cant decline before 24 hours") {
                    setDeclineErr("you can't decline before 24 hours")
                    document.getElementById(`errdeclinePara${e.target.id}`).innerText = "you can't decline before 24 hours"

                }
                else {
                    sendNotification(e.target.name, "surgery")
                    console.log(data.data)
                    setshowdata("none")
                    console.log("done sir")
                    history.push("/")

                }
                // history.push("/")

            }
            )
            .catch((err) => console.log(err))
    }
    // style={{display:showdata}}

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


    const submitDecline = (e) => {
        // setshowreason("block")
        // if(showreason === "none"){
        //     setshowreason("block")
        // }else{
        //     setshowreason("none")
        // }
        document.getElementById(`reason${e.target.id}`).style.display = "block"

    }






    const mytoday = new Date()

    const todayYear = mytoday.getFullYear()
    const todayMonth = mytoday.getMonth() + 1
    const todayDay = mytoday.getDay()

    const [dayDiff, setdayDiff] = useState()
    const [monthDiff, setmonthDiff] = useState()
    const [YearDiff, setYearDiff] = useState()




    var Mydiff = false;

    const DateDiff = (b_date) => {
        const dateDay = b_date.split("-")[2]
        const dateMonth = b_date.split("-")[1]
        const dateYear = b_date.split("-")[0]

        var dayDiff1 = dateDay - todayDay
        var monthDiff1 = dateMonth - todayMonth
        var YearDiff1 = dateYear - todayYear
        console.log("dayDiff1", dayDiff1)
        console.log("monthDiff1", monthDiff1)
        console.log("YearDiff1", YearDiff1)

        if (dayDiff1 > 0 | monthDiff1 > 0 | YearDiff1 > 0) {
            Mydiff = true
        } else {
            Mydiff = false
        }

    }

    // DateDiff("2022-08-02")
    // console.log("test1111 is :",Mydiff)


    const setmyReason = (e) => {
        setReason(e.target.value)
    }


    return (
        <>
            <h2 className="main-title">Scheduled Operations</h2>
            <div className=" mid container">
                <div className="container-fluid row">
                    <div>
                        <h5 id="head2">Surgical Operation Message</h5>
                    </div>
                </div>
            </div>


            {/* reason div */}





            {Surgeries.map((sur, index) => {
                // DateDiff(b_date[index])



                return (<>
                    {(sur.statusVet !== "declined" && dateleft !== true) && (
                        <div className="container-fluid row p-3 border border-secondary my-5 mx-2 rounded" style={{ display: showdata }}>

                            <div className="col-12 p-3 fs-4 text-danger">{sur.message}</div>

                            <div className="col-6">
                                <div className=" cc card">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor="span22">Animal Name: </label>
                                            <span className="span22">{sur.animalName}</span>

                                        </li>
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor="">owner Name:</label>
                                            <span className="span22">{sur.owner}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor=""> Animal Weight:</label>
                                            <span className="span22">{Weights[index]} kg</span>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor=""> Animal Type:</label>
                                            <span className="span22">{Species[index]}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="labels" htmlFor=""> Animal Gender:</label>
                                            <span className="span22">{genders[index]}</span>

                                        </li>

                                    </ul>
                                </div>
                            </div>


                            <div className="col-6">
                                <div className=" cc card">
                                    <ul className="list-group list-group-flush">
                                        {sur.price === 0 ? (<>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor=""> User's Status :</label>
                                                <span className="span22">{sur.statusUser} </span>
                                            </li>
                                            {sur.statusUser === "declined" && (<>
                                                <li className="list-group-item">
                                                    <label className="labels" htmlFor=""> User Reason :</label>
                                                    <span className="span22">{sur.reasonUser} </span>
                                                </li>


                                            </>)}

                                        </>) : (<>

                                            <li className="list-group-item">
                                                <label className="labels" htmlFor="span22">Operation date: </label>
                                                <span className="span22">{sur.date}</span>


                                            </li>
                                            <li className="list-group-item">

                                                <span className="span22 text-danger">Note* : you can't decline before 24 hours </span>
                                            </li>

                                            <li className="list-group-item">
                                                <label className="labels" htmlFor="">Operation Name:</label>
                                                <span className="span22">{sur.operationName}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor=""> Operation Price:</label>
                                                <span className="span22">{sur.price} $</span>
                                            </li>
                                            <li className="list-group-item">
                                                <label className="labels" htmlFor=""> User's Status:</label>
                                                <span className="span22">{sur.statusUser} </span>
                                            </li>
                                            {sur.statusUser === "declined" && (<>
                                                <li className="list-group-item">
                                                    <label className="labels" htmlFor=""> User Reason :</label>
                                                    <span className="span22">{sur.reasonUser} </span>
                                                </li>



                                            </>)}






                                            <li className="list-group-item" id={`reason${sur.id}`} style={{ display: "none" }}>
                                                <label className="sp text-danger" htmlFor="">Reason Of Decline:</label>
                                                <input id="reasonInput" placeholder="Reason" type="text" className="inputs" onChange={(e) => setmyReason(e)} required />
                                                <p id={`errdeclinePara${sur.id}`} className='text-danger'></p>
                                                <div className="d-flex justify-content-end"><button id={sur.id} name={sur.vetName} onClick={(e) => dismissSurgery(e)} className="btn btn-danger">Confirm</button></div>
                                            </li>
                                        </>)}



                                    </ul>
                                </div>



                                {sur.price === 0 ? (
                                    <>
                                        <Link to={`/NewSc/${sur.id}`}>  <button className="btn btn-danger mt-5 ms-4 px-3 py-2">Details</button></Link>

                                    </>
                                )
                                    :
                                    (
                                        <>

                                            <button name={sur.owner} id={sur.id} onClick={(e) => submitDecline(e)} className="btn btn-danger mt-5 ms-5 p-2">Decline & Dismiss</button>

                                        </>
                                    )}

                            </div>
                        </div>
                    )}
                </>)
            })}


        </>
    )
}
export default TableOfSurgries;


