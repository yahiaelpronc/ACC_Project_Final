
import 'bootstrap/dist/css/bootstrap.min.css';
import './PagesStatic/NewSchedule.css';
import Table from "../Components/ClassTable";
// mostafa  import 

import { useParams } from "react-router-dom"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from 'react'








function NewSchedule() {

    // my functions
    const history = useHistory()



    const myid = useParams().id
    const [mySurgery, setmySurgery] = useState({})
    const [MyAnimal, setMyAnimal] = useState({})
    const [dataCame, setDataCame] = useState(false)
    const [price, setPrice] = useState()
    const [date, setDate] = useState()
    const [Surgery_Operation, setSurgery_Operation] = useState()

    const [errdata, seterrdata] = useState({
        usernameErr: "",
        firstnameErr: "",
        lastnameErr: "",
        emailErr: "",
        passwordErr: "",
        cityErr: "",
        phoneErr: "",
        confirmpassErr: "",
        b_dateErr: "",
        addressErr: "",
        facebook_linkErr: "",
    })
    useEffect(() => {
        axios.get(`http://localhost:8000/api/findSurgery/${myid}/`)
            .then((res) => {
                setmySurgery(res.data)
                setDataCame(true)
            }

            )
            .catch((err) => console.log(err))
    }, [])



    useEffect(() => {
        axios.get(`http://localhost:8000/api/findSpecificAnimal/${mySurgery.animalName}/`)
            .then((res) => {
                setMyAnimal(res.data)
                getAge()
            })
            .catch((err) => console.log(err))
    }, [dataCame])

    const [agedata, setagedata] = useState("")

    const getAge = () => {
        const mydate = new Date()
        const myYear = mydate.getFullYear()

        const animalB_Date = MyAnimal.b_date
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

    const CurrentVet = useSelector((state) => state.loggedUser);
    const [medication, setMedication] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/getMedication/${mySurgery.animalName}/`)
            .then((res) => setMedication(res.data))
            .catch((err) => console.log(err))
    }, [dataCame])





    const updateSurgery = async (e) => {
        e.preventDefault()
        const dataField = new FormData()
        dataField.append("statusVet", "accepted")

        dataField.append("operationName", Surgery_Operation)
        dataField.append("price", price)
        dataField.append("date", date)

        await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/SurVetUpdates/${myid}/`,
            data: dataField
        }).then((res) => {
            sendNotification(mySurgery.owner, "surgery")
            history.push("/TableOfSurgries")
        }
        )
            .catch((err) => console.log(err))





    }




    const VetCancelSurgery = async (e) => {
        e.preventDefault()
        let formdata2 = new FormData()
        formdata2.append("statusVet", "declined")
        await axios({
            method: 'POST',
            url: `http://localhost:8000/api/updateOperationStatusVet/${myid}/`,
            data: formdata2
        })
            .then((data) => {
                sendNotification(mySurgery.owner, "surgery")
                history.push("/TableOfSurgries")
                console.log(data.data)
                console.log("done sir")
            }

            )
            .catch((err) => console.log(err))
    }
    function isInTheFuture(date) {
        let today = new Date();
        // 👇️ OPTIONAL!
        // This line sets the time of the current date to the
        // last millisecond, so the comparison returns `true` only if
        // date is at least tomorrow
        today.setHours(23, 59, 59, 998);
        console.log(date)
        return date < today;
    }
    function changeData(e) {
        if (e.target.name === "date") {
            if (isInTheFuture(new Date(String(e.target.value)))) {
                seterrdata({
                    ...errdata,
                    b_dateErr: "Please Choose A Correct Operation Date"
                })
            } else {
                seterrdata({
                    ...errdata,
                    b_dateErr: ""
                })
                setDate(e.target.value)
            }
        }
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

    return (
        <>
            <h2 className="main-title my-4">Scheduled Operations</h2>
            <div className=" mid container">
                <div className="container-fluid row">
                    <div>
                        <h5 id="head2"><strong>Owner's Message</strong></h5>
                        <p id="head2">{mySurgery.message}</p>
                    </div>
                    <div className="col-6">
                        <div className=" cc card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <label className="labels" htmlFor="span22">Animal Name: </label>
                                    <span className="span22">{mySurgery.animalName}</span>

                                </li>
                                <li className="list-group-item">
                                    <label className="labels" htmlFor="">owner Name:</label>
                                    <span className="span22">{mySurgery.owner}</span>
                                </li>
                                <li className="list-group-item">
                                    <label className="labels" htmlFor=""> Animal Weight:</label>
                                    <span className="span22">{MyAnimal.weight} kg</span>
                                </li>
                                <li className="list-group-item">
                                    <label className="labels" htmlFor=""> Animal Gender:</label>
                                    <span className="span22">{MyAnimal.gender}</span>
                                </li>
                                <li className="list-group-item">
                                    <label className="labels" htmlFor=""> Animal Type:</label>
                                    <span className="span22">{MyAnimal.species}</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className=" cc card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <label className="sp text-danger" htmlFor="">Operation Date:</label>
                                    <input type="date" onChange={(e) => changeData(e)} name='date' value={date} className="inputs" style={{ width: "50%" }} />
                                    <p className="text-danger">{errdata.b_dateErr}</p>
                                </li>
                                <li className="list-group-item">
                                    <label className="sp text-danger" htmlFor="">Operation Price:</label>
                                    <input placeholder="Price In $" type="number" className="inputs" onChange={(e) => setPrice(e.target.value)} name='price' value={price} required />
                                </li>
                                <li className="list-group-item">
                                    <label className="sp text-danger" htmlFor="">Operation Name:</label>
                                    <input placeholder="Operation" type="text" className="inputs" onChange={(e) => setSurgery_Operation(e.target.value)} name='Surgery_Operation' value={Surgery_Operation} required />

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Table medications={medication} />
            <div className="buttons">
                <button onClick={(e) => updateSurgery(e)} className="btn bb ">Accept Surgery</button>
                <button onClick={(e) => VetCancelSurgery(e)} className="btn bb">Deny Surgery</button>
            </div>

        </>
    )
}
export default NewSchedule;